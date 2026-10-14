'use strict';
// Server (Vercel) tidak punya font sistem, jadi teks di canvas tampil kosong. Font Liberation (setara Arial,
// Courier New, Times; lisensi SIL OFL) disertakan di assets/fonts dan didaftarkan sekali dengan nama WanzSans/WanzMono/WanzSerif.
const path = require('path');
const fs = require('fs');

const DIR = path.join(__dirname, '..', '..', 'assets', 'fonts');
const FACES = [
  ['LiberationSans-Regular.ttf', 'WanzSans'], ['LiberationSans-Bold.ttf', 'WanzSans'],
  ['LiberationMono-Regular.ttf', 'WanzMono'], ['LiberationMono-Bold.ttf', 'WanzMono'],
  ['LiberationSerif-Regular.ttf', 'WanzSerif'], ['LiberationSerif-Bold.ttf', 'WanzSerif']
];
let done = false;

function ensureFonts() {
  if (done) return true;
  let GlobalFonts;
  try { ({ GlobalFonts } = require('@napi-rs/canvas')); } catch (_) { return false; }
  let ok = 0;
  for (const [file, family] of FACES) {
    const p = path.join(DIR, file);
    try {
      if (fs.existsSync(p) && GlobalFonts.registerFromPath(p, family)) ok++;
    } catch (e) { console.warn('[fonts] gagal mendaftarkan', file, e.message); }
  }
  if (!ok) console.warn('[fonts] tidak ada font terdaftar; teks canvas bisa kosong. Cek folder assets/fonts');
  done = ok > 0;
  return done;
}

module.exports = { ensureFonts };
