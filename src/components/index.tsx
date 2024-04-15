import classNames from 'classnames';
import React, { Component } from 'react';
import ReactList, { ReactListProps } from '@jswork/react-list';

const CLASS_NAME = 'react-chat-scroller';
const supportOverflowAnchor = 'overflow-anchor' in document.documentElement.style;

export type ReactChatScrollerProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * The children element.
   */
  children?: React.ReactNode;
} & HTMLAttributes<any> &
  ReactListProps;

export default class ReactChatScroller extends Component<ReactChatScrollerProps> {
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
    this.locator?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  render() {
    const { className, style, id, children, ...props } = this.props;

    return (
      <div
        data-component={CLASS_NAME}
        id={id}
        style={style}
        className={classNames(CLASS_NAME, className)}>
        <ReactList as="div" {...props} />
        <div className="locator" ref={(locator) => (this.locator = locator)} />
        {children}
      </div>
    );
  }
}
