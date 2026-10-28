import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { currentBreakpoint, subscribeBreakpoints } from '../config';
import type { ResponsiveValue } from './types';

/** 화면을 감지하는 역할만 담당합니다. 크기 규격은 기존 CSS가 결정합니다. */
export class ResponsiveController implements ReactiveController {
  private connected = false;
  private unsubscribe?: () => void;
  private warned = false;
  constructor(private host: ReactiveControllerHost, private read: () => unknown) {
    host.addController(this);
  }
  private sync() {
    const value = this.read();
    const active = this.connected && !!value && typeof value === 'object' &&
      ['mobile', 'tablet', 'desktop'].some(key => (value as Record<string, unknown>)[key] !== undefined);
    if (active && !this.unsubscribe) this.unsubscribe = subscribeBreakpoints(() => this.host.requestUpdate());
    if (!active && this.unsubscribe) { this.unsubscribe(); this.unsubscribe = undefined; }
  }
  hostConnected() { this.connected = true; this.sync(); }
  hostUpdate() { this.sync(); }
  hostDisconnected() { this.connected = false; this.sync(); }
  resolve<T>(value: ResponsiveValue<T> | undefined, fallback: T): T {
    if (value === undefined || value === null) return fallback;
    if (typeof value !== 'object') return value as T;
    const values = value as Exclude<ResponsiveValue<T>, T> & { base?: T; mobile?: T; tablet?: T; desktop?: T };
    const breakpoint = currentBreakpoint();
    if (!breakpoint && !this.warned && ['mobile', 'tablet', 'desktop'].some(key => key in values)) {
      if ('enabledWarnings' in this.host.constructor) console.warn('hyo_designSystem: configureDesignSystem으로 기준 너비를 연결해 주세요. 기본값을 표시합니다.');
      this.warned = true;
    }
    return (breakpoint ? values[breakpoint] : undefined) ?? values.base ?? fallback;
  }
}
