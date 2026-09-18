import { useEffect, useMemo, useState } from 'react';
import Cropper from 'react-easy-crop';
import { FaCheck, FaCrop, FaRedo, FaSearchMinus, FaSearchPlus, FaTimes, FaTrash, FaUndo, FaUpload } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { resolvePortfolioAsset } from '../../lib/portfolioAssets';
import { uploadPortfolioFile } from '../../lib/portfolioService';
import 'react-easy-crop/react-easy-crop.css';

const inputClass = 'w-full rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] px-3 py-2 text-white outline-none focus:border-[#00F5C3]';
const cropAspectOptions = [
  { label: 'Certificate', value: 4 / 3 },
  { label: 'Landscape', value: 16 / 10 },
  { label: 'Portrait', value: 3 / 4 },
  { label: 'Original', value: undefined },
];

const emptyCertificate = () => ({
  id: `certificate-${Date.now()}`,
  title: '', issuer: '', issueDate: '', credentialId: '', verificationUrl: '', description: '', image: '',
  published: true, order: 1,
});

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

async function createCroppedFile(imageSrc, pixelCrop, rotation) {
  const image = await createImage(imageSrc);
  const radians = (rotation * Math.PI) / 180;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const boundingBox = {
    width: Math.abs(Math.cos(radians) * image.width) + Math.abs(Math.sin(radians) * image.height),
    height: Math.abs(Math.sin(radians) * image.width) + Math.abs(Math.cos(radians) * image.height),
  };
  canvas.width = boundingBox.width;
  canvas.height = boundingBox.height;
  context.save();
  context.translate(boundingBox.width / 2, boundingBox.height / 2);
  context.rotate(radians);
  context.translate(-image.width / 2, -image.height / 2);
  context.drawImage(image, 0, 0);
  context.restore();

  const croppedCanvas = document.createElement('canvas');
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;
  croppedCanvas.getContext('2d').drawImage(canvas, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Unable to prepare the cropped image.'));
        return;
      }
      resolve(new File([blob], `certificate-${Date.now()}.jpg`, { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.9);
  });
}

function CertificatePreview({ source, title }) {
  const [failed, setFailed] = useState(false);
  const src = resolvePortfolioAsset(source);
  useEffect(() => setFailed(false), [source]);
  if (!src || failed) return <div className="flex h-full min-h-44 items-center justify-center bg-[#0B1210] px-6 text-center text-sm text-gray-400">Certificate image unavailable</div>;
  return <img src={src} alt={title || 'Certificate preview'} onError={() => setFailed(true)} className="h-full w-full object-contain" />;
}

export default function CertificatesEditor() {
  const { portfolio, setPortfolio, savePortfolio } = usePortfolio();
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [cropSource, setCropSource] = useState('');
  const [cropFile, setCropFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(4 / 3);
  const [cropPixels, setCropPixels] = useState(null);
  const [cropPreview, setCropPreview] = useState('');
  const certificates = portfolio.certificates || [];
  const editingImage = useMemo(() => cropPreview || editing?.image || '', [cropPreview, editing]);

  const startNew = () => { setNotice(''); setEditing(emptyCertificate()); setCropPreview(''); setCropFile(null); };
  const updateField = (field, value) => setEditing((current) => ({ ...current, [field]: value }));

  const handleFile = (file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setNotice('Use a JPG, PNG, or WEBP certificate image.'); return; }
    if (file.size > 10 * 1024 * 1024) { setNotice('Certificate images must be smaller than 10 MB.'); return; }
    const source = URL.createObjectURL(file);
    setCropFile(file); setCropSource(source); setCropPreview(source); setCrop({ x: 0, y: 0 }); setZoom(1); setRotation(0);
    setNotice('Image preview ready. Open Crop to adjust it before saving.');
  };

  const applyCrop = async () => {
    if (!cropSource || !cropPixels) return;
    try {
      const file = await createCroppedFile(cropSource, cropPixels, rotation);
      const preview = URL.createObjectURL(file);
      setCropFile(file); setCropPreview(preview); setCropSource(''); setNotice('Crop applied. Save the certificate to upload this image.');
    } catch (error) { setNotice(error.message); }
  };

  const cancelCrop = () => { setCropSource(''); setCropPreview(editing?.image || ''); setCropFile(null); };

  const saveItem = async (event) => {
    event.preventDefault();
    if (!editing.title.trim() || !editing.issuer.trim()) { setNotice('Title and issuing organization are required.'); return; }
    setSaving(true); setNotice('');
    try {
      let nextImage = editing.image;
      if (cropFile) {
        const result = await uploadPortfolioFile(cropFile, 'certificates');
        if (!result.ok) throw new Error(result.message);
        nextImage = result.path;
      }
      const nextItem = { ...editing, image: nextImage, imagePath: nextImage };
      const nextItems = certificates.some((item) => item.id === editing.id) ? certificates.map((item) => item.id === editing.id ? nextItem : item) : [nextItem, ...certificates];
      const nextPortfolio = { ...portfolio, certificates: nextItems };
      setPortfolio(() => nextPortfolio); await savePortfolio(nextPortfolio); setEditing(null); setCropFile(null); setCropPreview(''); setNotice('Certificate saved and queued for Supabase sync.');
    } catch (error) { setNotice(error.message || 'Unable to save certificate.'); } finally { setSaving(false); }
  };

  const removeItem = async (id) => {
    if (!window.confirm('Delete this certificate? This action cannot be undone.')) return;
    const nextPortfolio = { ...portfolio, certificates: certificates.filter((item) => item.id !== id) };
    setPortfolio(() => nextPortfolio); await savePortfolio(nextPortfolio); if (editing?.id === id) setEditing(null); setNotice('Certificate deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-bold text-white">Certificates</h2><p className="mt-2 text-sm text-gray-400">Upload, crop, replace, and publish readable certificate images.</p></div><button type="button" onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-[#00F5C3] px-4 py-2 text-sm font-semibold text-[#050505]"><FaUpload /> Add Certificate</button></div>
      {notice && <p className="rounded-xl border border-[#00F5C3]/20 bg-[#00F5C3]/10 px-4 py-3 text-sm text-[#00F5C3]">{notice}</p>}

      {editing && <form onSubmit={saveItem} className="space-y-5 rounded-2xl border border-[#00F5C3]/30 bg-[#111815] p-5 shadow-2xl shadow-[#00F5C3]/5">
        <div className="flex items-center justify-between"><h3 className="text-lg font-semibold text-white">{certificates.some((item) => item.id === editing.id) ? 'Edit certificate' : 'New certificate'}</h3><button type="button" onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><FaTimes /></button></div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-gray-300"><span>Title *</span><input value={editing.title} onChange={(event) => updateField('title', event.target.value)} className={inputClass} required /></label>
          <label className="space-y-2 text-sm text-gray-300"><span>Issuing organization *</span><input value={editing.issuer} onChange={(event) => updateField('issuer', event.target.value)} className={inputClass} required /></label>
          <label className="space-y-2 text-sm text-gray-300"><span>Issue date</span><input type="date" value={editing.issueDate || ''} onChange={(event) => updateField('issueDate', event.target.value)} className={inputClass} /></label>
          <label className="space-y-2 text-sm text-gray-300"><span>Credential ID</span><input value={editing.credentialId || ''} onChange={(event) => updateField('credentialId', event.target.value)} className={inputClass} /></label>
          <label className="space-y-2 text-sm text-gray-300 md:col-span-2"><span>Verification URL</span><input type="url" value={editing.verificationUrl || ''} onChange={(event) => updateField('verificationUrl', event.target.value)} className={inputClass} /></label>
          <label className="space-y-2 text-sm text-gray-300 md:col-span-2"><span>Description</span><textarea rows={3} value={editing.description || ''} onChange={(event) => updateField('description', event.target.value)} className={inputClass} /></label>
        </div><div className="space-y-3"><div className="flex min-h-52 items-center justify-center overflow-hidden rounded-xl border border-[#00F5C3]/20 bg-[#0B1210] p-2"><CertificatePreview source={editingImage} title={editing.title} /></div><label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#00F5C3]/30 px-4 py-3 text-sm font-semibold text-[#00F5C3]"><FaUpload /> Replace image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handleFile(event.target.files?.[0])} className="hidden" /></label>{cropFile && !cropSource && <button type="button" onClick={() => { setCropSource(cropPreview); setCrop({ x: 0, y: 0 }); setZoom(1); }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00F5C3] px-4 py-3 text-sm font-semibold text-[#050505]"><FaCrop /> Crop / edit image</button>}{editing.image && !cropFile && <p className="truncate text-xs text-gray-500">Existing image: {editing.image}</p>}</div></div>
        <div className="flex flex-wrap justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300">Cancel</button><button type="submit" disabled={saving} className="rounded-xl bg-[#00F5C3] px-5 py-2 text-sm font-semibold text-[#050505]">{saving ? 'Saving...' : 'Save Certificate'}</button></div>
      </form>}

      <div className="grid gap-4 xl:grid-cols-2">{certificates.map((certificate) => <div key={certificate.id} className="flex flex-col gap-4 rounded-2xl border border-[#00F5C3]/20 bg-[#111815] p-4 md:flex-row"><div className="h-36 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B1210] md:w-52"><CertificatePreview source={certificate.image} title={certificate.title} /></div><div className="min-w-0 flex-1"><h3 className="font-semibold text-white">{certificate.title}</h3><p className="mt-1 text-sm text-[#00F5C3]">{certificate.issuer}</p><p className="mt-1 text-xs text-gray-400">{certificate.issueDate || 'Date not set'}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => { setEditing({ ...certificate }); setCropFile(null); setCropPreview(''); }} className="rounded-lg border border-[#00F5C3]/30 px-3 py-2 text-xs text-[#00F5C3]">Edit</button><button type="button" onClick={() => removeItem(certificate.id)} className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300"><FaTrash /> Delete</button></div></div></div>)}</div>

      {cropSource && <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"><div className="w-full max-w-4xl rounded-2xl border border-[#00F5C3]/30 bg-[#0B1210] p-5 shadow-2xl shadow-[#00F5C3]/10"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-lg font-semibold text-white">Edit certificate image</h3><p className="text-xs text-gray-400">Drag, zoom, rotate, and apply the crop before saving.</p></div><button type="button" onClick={cancelCrop} className="text-gray-400 hover:text-white"><FaTimes /></button></div><div className="relative h-[min(58vh,520px)] overflow-hidden rounded-xl bg-black"><Cropper image={cropSource} crop={crop} zoom={zoom} rotation={rotation} aspect={aspect} onCropChange={setCrop} onZoomChange={setZoom} onRotationChange={setRotation} onCropComplete={(_, pixels) => setCropPixels(pixels)} /></div><div className="mt-4 grid gap-4 md:grid-cols-3"><label className="text-xs text-gray-400">Zoom<input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="mt-2 w-full accent-[#00F5C3]" /></label><label className="text-xs text-gray-400">Aspect ratio<select value={aspect || 'original'} onChange={(event) => setAspect(event.target.value === 'original' ? undefined : Number(event.target.value))} className={`${inputClass} mt-2 text-sm`}>{cropAspectOptions.map((option) => <option key={option.label} value={option.value || 'original'}>{option.label}</option>)}</select></label><div className="flex items-end gap-2"><button type="button" onClick={() => setRotation((value) => value - 90)} className="rounded-lg border border-white/10 p-3 text-gray-300" title="Rotate left"><FaUndo /></button><button type="button" onClick={() => setRotation((value) => value + 90)} className="rounded-lg border border-white/10 p-3 text-gray-300" title="Rotate right"><FaRedo /></button><button type="button" onClick={() => { setCrop({ x: 0, y: 0 }); setZoom(1); setRotation(0); }} className="rounded-lg border border-white/10 p-3 text-gray-300" title="Reset crop"><FaSearchMinus /><FaSearchPlus /></button></div></div><div className="mt-5 flex justify-end gap-3"><button type="button" onClick={cancelCrop} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300"><FaTimes /> Cancel</button><button type="button" onClick={applyCrop} className="inline-flex items-center gap-2 rounded-xl bg-[#00F5C3] px-5 py-2 text-sm font-semibold text-[#050505]"><FaCheck /> Apply Crop</button></div></div></div>}
    </div>
  );
}
