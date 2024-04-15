import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import ReactList, { ReactListProps } from '@jswork/react-list';

const CLASS_NAME = 'react-chat-scroller';

export type ReactChatScrollerProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Default value.
   */
  value?: object;
  /**
   * The change handler.
   */
  onChange?: Function;
  /**
   * The children element.
   */
   children?: React.ReactNode;
} & HTMLAttributes<any> & ReactListProps;

export default class ReactChatScroller extends Component<ReactChatScrollerProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    onChange: noop
  };

  shouldComponentUpdate(nextProps: Readonly<any>): boolean {
    const { items } = nextProps;
    if (items.length !== this.props.items.length) {
      this.scrollToBottom();
    }
    return true;
  }

  private scrollToBottom = () => {
    const locator = document.querySelector(`.${CLASS_NAME} .locator`);
    if (locator) {
      locator.scrollIntoView();
    }
  };

  render() {
    const { className, value, onChange, children, items, ...props } = this.props;

    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}>
        <ReactList items={items} {...props}/>
        <div className="locator"/>
      </div>
    );
  }
}
