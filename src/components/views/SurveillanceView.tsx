'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTenantAuth, CameraFeed } from '@/context/TenantAuthContext';
import {
  Shield,
  Eye,
  Camera,
  Maximize2,
  RefreshCw,
  CheckCircle2,
  Radio,
} from 'lucide-react';

export const SurveillanceView: React.FC = () => {
  const { language, t } = useLanguage();
  const { tenant } = useTenantAuth();

  const cameras: CameraFeed[] = tenant?.cameras || [];
  const [selectedCamId, setSelectedCamId] = useState<string | null>(null);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [snapshotToast, setSnapshotToast] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const selectedCam = cameras.find((c) => c.id === selectedCamId) || cameras[0] || null;

  // Live HUD Clock (Indianapolis / America/New_York or local)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace('T', ' ').slice(0, 19) + ' EST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fullscreen trigger
  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  // Snapshot capture with timestamp watermark
  const handleSnapshot = () => {
    setSnapshotToast(true);
    setTimeout(() => setSnapshotToast(false), 4000);

    // Create a simulated snapshot download
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = isNightVision ? '#101518' : '#0B1526';
      ctx.fillRect(0, 0, 1280, 720);

      // Watermark HUD
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(`HYCO CCTV — ${selectedCam?.name[language] || 'Channel 1'}`, 40, 50);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px monospace';
      ctx.fillText(`${currentTime} — ${tenant?.propertyName || 'HYCO Complex'}`, 40, 90);
      ctx.fillText(`STREAM: HIKVISION HIK-CONNECT CLOUD P2P (H.264 / 1080p)`, 40, 130);

      // Grid guides
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 160, 1200, 500);

      const link = document.createElement('a');
      link.download = `HYCO-CCTV-SNAPSHOT-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleRefreshStream = () => {
    setIsLive(false);
    setTimeout(() => {
      setIsLive(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              {t('cctv.hikvision_badge')}
            </span>
            <span className="text-xs text-slate-400">
              {tenant?.propertyName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('cctv.title')}
          </h2>
        </div>
      </div>

      {/* Main CCTV Player & Control Console */}
      <div className="glass-card rounded-3xl p-4 sm:p-6 border border-white/10 relative overflow-hidden">
        {/* Main Video Monitor Container */}
        <div
          ref={playerContainerRef}
          className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl transition-all ${
            isNightVision ? 'filter saturate-50 contrast-125' : ''
          }`}
        >
          {/* Simulated Video Stream Player */}
          {isLive ? (
            <video
              ref={videoRef}
              src={selectedCam?.sampleVideo}
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isNightVision ? 'opacity-85 brightness-95' : 'opacity-90'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black/90">
              <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mb-2" />
              <span className="text-xs text-slate-400 font-mono">
                RE-CONNECTING HIK-CONNECT RTSP SUB-STREAM...
              </span>
            </div>
          )}

          {/* IR Night Vision Overlay Tint */}
          {isNightVision && (
            <div className="absolute inset-0 bg-emerald-950/20 mix-blend-color pointer-events-none" />
          )}

          {/* CCTV HUD Scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

          {/* CCTV HUD: Top Left Camera Details */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex flex-col font-mono text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold tracking-widest text-[10px] flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                REC
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-600/90 text-white font-bold text-[10px] tracking-wider flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-ping" />
                {t('common.live')}
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-white font-bold border border-white/10 text-[10px] sm:text-[11px]">
                {selectedCam?.name[language]}
              </span>
            </div>
            <span className="text-slate-300 text-[10px] sm:text-[11px] mt-1 bg-black/40 px-1.5 py-0.5 rounded w-fit">
              LOC: {selectedCam?.location} • CH {selectedCam?.channel}
            </span>
          </div>

          {/* CCTV HUD: Top Right Live Clock */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 font-mono text-[11px] sm:text-xs text-right">
            <div className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white font-bold shadow-md">
              {currentTime}
            </div>
            <div className="text-[10px] text-[#D4AF37] font-semibold mt-1">
              HIKVISION DS-7616NI-K2
            </div>
          </div>

          {/* CCTV HUD: Bottom Left Telemetry */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5 z-20 font-mono text-[10px] sm:text-xs flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/20">
              1080p • 20.0 FPS
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-slate-300 border border-white/10">
              BITRATE: 842 Kbps (VBR)
            </span>
            {isNightVision && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-400/40">
                IR MATRIX ON
              </span>
            )}
          </div>

          {/* CCTV HUD: Bottom Right Interactive Control Pill */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 z-20 flex items-center gap-1.5 sm:gap-2">
            {/* Night Vision Toggle */}
            <button
              onClick={() => setIsNightVision(!isNightVision)}
              title={t('cctv.night_vision')}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all text-xs font-bold flex items-center gap-1.5 ${
                isNightVision
                  ? 'bg-emerald-500 text-[#070D18] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isNightVision ? 'IR ON' : 'IR OFF'}
              </span>
            </button>

            {/* Snapshot */}
            <button
              onClick={handleSnapshot}
              title={t('cctv.snapshot')}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 text-xs font-bold"
            >
              <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">{t('cctv.snapshot')}</span>
            </button>

            {/* Refresh */}
            <button
              onClick={handleRefreshStream}
              title={t('common.refresh')}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              title={t('cctv.fullscreen')}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Snapshot Toast Feedback */}
        {snapshotToast && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('cctv.snapshot_saved')}</span>
          </div>
        )}

        {/* Camera Selector Channel Strip */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t('cctv.cam_select')} ({cameras.length} {language === 'en' ? 'Feeds' : 'Canales'})
            </span>
            <span className="text-[11px] text-[#D4AF37] font-semibold">
              {tenant?.propertyName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cameras.map((cam) => {
              const isSelected = selectedCam?.id === cam.id;

              return (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCamId(cam.id)}
                  className={`p-3 rounded-2xl text-left border transition-all relative group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0F1E36] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      CH 0{cam.channel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {cam.resolution}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold truncate ${
                      isSelected ? 'text-[#D4AF37]' : 'text-white'
                    }`}>
                      {cam.name[language]}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {cam.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
