import React, {
  FC,
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes
} from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm"
}

export type ButtonType = "primary" | "default" | "danger" | "link";

// export enum ButtonType {
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link"
// }

interface BaseButtonProps {
  className?: string;
  /** 设置 Button 的禁用 */
  disabled?: boolean;
  /** 设置 Button 的尺寸 */
  size?: ButtonSize;
  /** 设置 Button 的类型 */
  btnType?: ButtonType;
  children: ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 这是我们第一个 Button 组件
 * ## Button header
 * ```js
 * import { Button } from 'vikingship'
 * ```
 * @param props
 * @returns
 */
export const Button: FC<ButtonProps> = props => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;

  // btn, btn-lg, btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default"
};

export default Button;
