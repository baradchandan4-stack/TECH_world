import type { ReactNode, CSSProperties } from 'react';
import { useGame } from '../state/game';
import TechBot3D from '../three/TechBot';
import { sfx } from '../lib/audio';

export function Btn({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  full,
  icon,
  style,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'gold' | 'danger' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  full?: boolean;
  icon?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`btn btn-${variant} btn-${size} ${full ? 'btn-full' : ''}`}
      disabled={disabled}
      style={style}
      onClick={() => {
        if (disabled) return;
        sfx.click();
        onClick?.();
      }}
    >
      {icon ? <span className="btn-icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

export function Card({
  children,
  className = '',
  onClick,
  glow,
  style,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glow?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`card ${onClick ? 'card-click' : ''} ${className}`}
      style={{ ...(glow ? ({ '--glow': glow } as CSSProperties) : {}), ...style }}
      onClick={
        onClick
          ? () => {
              sfx.click();
              onClick();
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export function Bar({ value, color = 'var(--cyan)', label }: { value: number; color?: string; label?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div className="bar-wrap" aria-label={label} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
      <span className="bar-pct">{pct}%</span>
    </div>
  );
}

export function Stat({ icon, value, label, color }: { icon: string; value: ReactNode; label: string; color?: string }) {
  return (
    <div className="stat" style={color ? { borderColor: color } : undefined}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export function TopBar({ title, onBack, subtitle }: { title: string; onBack?: () => void; subtitle?: string }) {
  const { p, level } = useGame();
  return (
    <header className="topbar">
      {onBack ? (
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Back">
          ←
        </button>
      ) : (
        <div className="brand-dot" aria-hidden>
          TQ
        </div>
      )}
      <div className="topbar-title">
        <strong>{title}</strong>
        {subtitle ? <small>{subtitle}</small> : null}
      </div>
      <div className="topbar-stats">
        <span className="chip chip-lvl" title="Level">
          ⭐ {level}
        </span>
        <span className="chip chip-xp" title="XP">
          {p.xp} XP
        </span>
        <span className="chip chip-coin" title="Coins">
          🪙 {p.coins}
        </span>
      </div>
    </header>
  );
}

export function Toasts() {
  const { toasts } = useGame();
  return (
    <div className="toast-host" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.tone}`}>
          <span>{t.icon}</span>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        {title ? <h3 className="modal-title">{title}</h3> : null}
        {children}
        <Btn variant="ghost" size="sm" full onClick={onClose}>
          ✕
        </Btn>
      </div>
    </div>
  );
}

/** TECHBOT speaking panel with optional 3D avatar. */
export function TechBotPanel({
  text,
  mood = 'happy',
  showAvatar = false,
  compact = false,
  onSpeak,
}: {
  text: string;
  mood?: 'happy' | 'cheer' | 'think' | 'oops';
  showAvatar?: boolean;
  compact?: boolean;
  onSpeak?: () => void;
}) {
  return (
    <div className={`techbot-panel ${compact ? 'compact' : ''}`}>
      {showAvatar ? (
        <div className="techbot-avatar">
          <TechBot3D mood={mood} height={compact ? 120 : 190} />
        </div>
      ) : (
        <div className={`techbot-mini mood-${mood}`} aria-hidden>
          <span className="tb-eye" />
          <span className="tb-eye" />
        </div>
      )}
      <div className="bubble">
        <div className="bubble-name">TECHBOT</div>
        <p>{text}</p>
        {onSpeak ? (
          <button type="button" className="speak-btn" onClick={onSpeak} aria-label="Speak">
            🔊
          </button>
        ) : null}
      </div>
    </div>
  );
}
