import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}


interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string
}

// button 和 a标签 本身可以有很多属性，不可能再这里一一定义，
//NativeButtonProps AnchorButtonProps 先取得这俩所有自身可以加的属性
//a标签的按钮 同时具有 a标签和 button的属性 用 & 代表两种都有，但是如果a标签有button的某种属性可能会报错，所以要变为可选
//Partial 是TS提供的 可以将传入的类型变为可选的
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
//this.props.children属性，它表示组件的所有子节点：
const Button: React.FC<ButtonProps> = props => {
  const {
    btnType,
    className,
    size,
    disabled,
    children,
    href,
    ...restProps
  } = props;
  const classes = classNames('btn', 'className', {
    [`btn-${btnType}`]: btnType, //classnames写法 'btn-primary':true or false;
    [`btn-${size}`]: size,
    'disabled': 'link' && disabled
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;
