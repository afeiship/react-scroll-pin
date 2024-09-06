import classNames from 'classnames';
import React, { Component } from 'react';

// https://jonaskuske.github.io/smoothscroll-anchor-polyfill/
// https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/

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

  componentDidUpdate(): void {
    if (!supportOverflowAnchor) {
      this.bottom();
    }
  }

  componentDidMount(): void {
    this.bottom();
  }

  public bottom = () => {
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
