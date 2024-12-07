import classNames from 'classnames';
import React, { Component } from 'react';
import { ReactHarmonyEvents } from '@jswork/harmony-events';
import type { EventMittNamespace } from '@jswork/event-mitt';


// https://jonaskuske.github.io/smoothscroll-anchor-polyfill/
// https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/

const CLASS_NAME = 'react-scroll-pin';
const supportOverflowAnchor = 'overflow-anchor' in document.documentElement.style;
const SCROLLER_PIN_OPTIONS: ScrollIntoViewOptions = { behavior: 'smooth', block: 'end' };

export type ReactScrollPinProps = {
  /**
   * The identity name.
   */
  name?: string;
  /**
   * The forwarded ref.
   */
  forwardedRef?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export default class ReactScrollPin extends Component<ReactScrollPinProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {};
  // 1. public events
  static events = ['bottom'];
  static event: EventMittNamespace.EventMitt;

  private locator: HTMLElement | null = null;
  private harmonyEvents: ReactHarmonyEvents | null = null;

  componentDidUpdate(): void {
    if (!supportOverflowAnchor) {
      this.bottom();
    }
  }

  componentDidMount(): void {
    // 2. init harmonyEvents
    this.harmonyEvents = ReactHarmonyEvents.create(this);
    this.bottom();
  }

  componentWillUnmount() {
    // 3. destroy harmonyEvents
    this.harmonyEvents?.destroy();
  }

  /* ----- public eventBus methods ----- */
  public bottom = (arg?: ScrollIntoViewOptions) => {
    const options = typeof arg !== 'undefined' ? arg : SCROLLER_PIN_OPTIONS;
    this.locator?.scrollIntoView(options);
  };

  render() {
    const { name, className, children, forwardedRef, ...props } = this.props;

    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} ref={forwardedRef} {...props}>
        {children}
        <div className="locator" ref={(locator) => (this.locator = locator)} />
      </section>
    );
  }
}
