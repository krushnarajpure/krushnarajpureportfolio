import krishiMitraImage from '../project/krishimitra.jpg.png';
import studentManagementImage from '../project/StudenMangement.png';
import portfolioImage from '../project/PersonalPorfolio.jpg.png';
import retailBillingImage from '../project/RetailBillingSoftware.jpg.png';
import javaCertificate from '../certificate/eduskills-java.png';
import ibmCertificate from '../certificate/ibm.png';
import jsCertificate from '../certificate/javascript.png';
import reactCertificate from '../certificate/react.png';
import sqlCertificate from '../certificate/sql.png';
import webDevCertificate from '../certificate/web-development.png';
import itvedantCertificate from '../achievements/itvedant.jpg.jpeg';
import athenuraCertificate from '../achievements/Athnura .jpg.png';
import profileImage from '../profile/Yamini.jpg - Copy.jpeg';
import { supabaseStorageBucket, supabaseUrl } from './supabase';

const assets = {
  '/src/project/krishimitra.jpg.png': krishiMitraImage,
  '/src/project/StudenMangement.png': studentManagementImage,
  '/src/project/PersonalPorfolio.jpg.png': portfolioImage,
  '/src/project/RetailBillingSoftware.jpg.png': retailBillingImage,
  '/src/certificate/eduskills-java.png': javaCertificate,
  '/src/certificate/ibm.png': ibmCertificate,
  '/src/certificate/javascript.png': jsCertificate,
  '/src/certificate/react.png': reactCertificate,
  '/src/certificate/sql.png': sqlCertificate,
  '/src/certificate/web-development.png': webDevCertificate,
  '/src/achievements/itvedant.jpg.jpeg': itvedantCertificate,
  '/src/achievements/Athnura .jpg.png': athenuraCertificate,
  '/src/profile/Yamini.jpg - Copy.jpeg': profileImage,
};

export function resolvePortfolioAsset(source) {
  if (!source) return '';
  if (assets[source]) return assets[source];
  if (/^(data:|blob:|https?:\/\/)/i.test(source)) return source;
  if (source.startsWith('/')) return source;

  const storagePath = source
    .replace(/^\/?storage\/v1\/object\/(?:public|sign)\/[^/]+\//i, '')
    .replace(/^\/+/, '');

  return supabaseUrl && supabaseStorageBucket
    ? `${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucket}/${storagePath}`
    : source;
}
