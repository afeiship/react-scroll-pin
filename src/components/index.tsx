import classNames from 'classnames';
import React, { Component } from 'react';

const CLASS_NAME = 'react-scroll-pin';
const supportOverflowAnchor = 'overflow-anchor' in document.documentElement.style;
const SCROLLER_PIN_OPTIONS: ScrollIntoViewOptions = { behavior: 'smooth', block: 'end' };

export type ReactScrollPinProps = {
  /**
   * The extended className for component.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default class ReactScrollPin extends Component<ReactScrollPinProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {};
  private locator: HTMLElement | null = null;
  private hasInit = false;

  componentDidUpdate(): void {
    if (!supportOverflowAnchor) {
      this.scrollToBottom();
    } else {
      if (!this.hasInit) {
        this.scrollToBottom();
        this.hasInit = true;
      }
    }
  }

  private scrollToBottom = () => {
    this.locator?.scrollIntoView(SCROLLER_PIN_OPTIONS);
  };

  render() {
    const { className, children, ...props } = this.props;

    return (
      <section data-component={CLASS_NAME} className={classNames(CLASS_NAME, className)} {...props}>
        {children}
        <div className="locator" ref={(locator) => (this.locator = locator)} />
      </section>
    );
  }
}
