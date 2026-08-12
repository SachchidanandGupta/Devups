import React, { useState, useEffect } from 'react';

const BOOT_SEQUENCE = [
  "INIT: Starting kernel initialization...",
  "ACPI: Core revision 20230404",
  "pci 0000:00:00.0: [8086:1237] type 00 class 0x060000",
  "MOUNTING_FS: /dev/root on / type ext4 (rw,relatime)",
  "VFS: Mounted root (ext4 filesystem) readonly.",
  "Freeing unused kernel image (initmem) memory: 2048K",
  "Run /sbin/init as init process",
  "systemd[1]: Inserted module 'autofs4'",
  "ESTABLISHING_UPLINK: Handshake initiated...",
  "UPLINK_SECURE: TLSv1.3 negotiated",
  "VERIFYING_INTEGRITY: Checksum OK",
  "LOADING_MODULES: telemetry, logs, clusters",
  "SYNC: Acquiring state data...",
  "SYNC: Blocks 1-4096 verified",
  "SYNC: Blocks 4097-8192 verified",
  "SYS_READY: Entering command mode."
];

export default function DevUpsInitializer() {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isOperational, setIsOperational] = useState(false);

  // Handle Boot Log streaming
  useEffect(() => {
    let logIndex = 0;
    let timeoutId;

    const updateBootLog = () => {
      if (logIndex < BOOT_SEQUENCE.length) {
        const timestamp = `[${(Math.random() * 5).toFixed(3)}] `;
        const newEntry = `${timestamp}${BOOT_SEQUENCE[logIndex]}`;

        // Prepend new log item
        setLogs((prevLogs) => [newEntry, ...prevLogs]);
        logIndex++;

        const nextDelay = Math.random() * 300 + 50;
        timeoutId = setTimeout(updateBootLog, nextDelay);
      }
    };

    const initialTimeout = setTimeout(updateBootLog, 500);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle Progress Bar increment
  useEffect(() => {
    let currentProgress = 0;
    let timeoutId;

    const updateProgress = () => {
      if (currentProgress < 100) {
        currentProgress += Math.random() * 5;
        if (currentProgress > 100) currentProgress = 100;

        const roundedProgress = Math.floor(currentProgress);
        setProgress(roundedProgress);

        if (roundedProgress >= 100) {
          setIsOperational(true);
        } else {
          const nextDelay = Math.random() * 150 + 20;
          timeoutId = setTimeout(updateProgress, nextDelay);
        }
      }
    };

    const initialTimeout = setTimeout(updateProgress, 500);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col justify-between p-[24px] relative overflow-hidden font-sans text-[14px] antialiased">
      {/* Custom Styles for Scanline, Glitch & Cursor */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scanline-effect {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: rgba(0, 255, 136, 0.1);
          animation: scanline 4s linear infinite;
          pointer-events: none;
          z-index: 50;
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #131313;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 blue;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(78px, 9999px, 86px, 0); }
          20% { clip: rect(6px, 9999px, 86px, 0); }
          40% { clip: rect(98px, 9999px, 20px, 0); }
          60% { clip: rect(54px, 9999px, 7px, 0); }
          80% { clip: rect(96px, 9999px, 26px, 0); }
          100% { clip: rect(100px, 9999px, 14px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip: rect(50px, 9999px, 45px, 0); }
          20% { clip: rect(4px, 9999px, 73px, 0); }
          40% { clip: rect(28px, 9999px, 73px, 0); }
          60% { clip: rect(80px, 9999px, 74px, 0); }
          80% { clip: rect(76px, 9999px, 2px, 0); }
          100% { clip: rect(89px, 9999px, 99px, 0); }
        }
        .typing-cursor::after {
          content: '█';
          animation: blink 1s step-end infinite;
          color: #00ff88;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* CRT Scanline */}
      <div className="scanline-effect" />

      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#222222 1px, transparent 1px), linear-gradient(90deg, #222222 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto relative z-10 gap-12">
        {/* Center Console */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          {/* Brand Element */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="material-symbols-outlined text-[64px] text-accent"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
            <h1
              className="font-sans text-[32px] font-bold text-accent uppercase tracking-tighter glitch-text"
              data-text="DevUps"
            >
              DevUps
            </h1>
            <h2 className="text-[12px] text-text-secondary uppercase tracking-[0.15em] mt-2 font-medium">
              [ SYSTEM_INITIALIZATION_SEQUENCE ]
            </h2>
          </div>

          {/* Boot Log Window */}
          <div className="w-full bg-surface border border-border p-4 h-48 overflow-y-auto flex flex-col-reverse relative">
            <div className="text-text-secondary font-sans text-[14px] opacity-80 whitespace-pre-wrap break-all leading-tight">
              {logs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
            <div className="absolute top-0 right-0 bg-accent text-black text-[12px] tracking-[0.15em] font-medium px-2 py-1">
              SYS_LOG
            </div>
          </div>

          {/* Progress Module */}
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between text-[12px] tracking-[0.15em] font-medium">
              <span className="text-accent">INTEGRITY_CHECK</span>
              <span className="text-accent">{progress}%</span>
            </div>
            <div className="w-full h-4 border border-border bg-surface relative">
              <div
                className="h-full bg-accent transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between font-sans text-[10px] text-text-secondary uppercase mt-1">
              <span>MOUNT: /dev/sdX</span>
              <span>MEM_ALLOC: 4096MB</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Metrics Footer */}
      <footer className="w-full max-w-[1440px] mx-auto flex justify-between items-end border-t border-border pt-4 z-10 relative">
        <div className="flex flex-col gap-1 text-[12px] tracking-[0.15em] font-medium text-[#b9cbb9]">
          <span>VERSION 1.0.4</span>
          <span className="flex items-center gap-2">
            <span
              className={`w-2 h-2 block ${
                isOperational ? 'bg-accent' : 'bg-warning'
              }`}
            />
            STATUS: {isOperational ? 'OPERATIONAL' : 'SYNCING...'}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1 text-[12px] tracking-[0.15em] font-medium text-text-secondary">
          <span>LATENCY: 12ms</span>
          <span className="text-accent typing-cursor">AWAITING_UPLINK</span>
        </div>
      </footer>
    </div>
  );
}