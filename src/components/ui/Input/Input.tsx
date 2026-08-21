'use client'
import {EyeIcon, EyeIconOff, SearchIcon} from "@/components/ui/Input/icons";
import React, {useState} from 'react'
import s from "./Input.module.css"

type InputVariant = "text" | "password" | "search"

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    variant: InputVariant
    label?: string
    error?: boolean
    errorText?: string
}


export const Input = ({variant, label, error = false, errorText, disabled, ...restProps}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputClassName = `
    ${s.input} 
    ${error ? s.error : ''}
    ${variant === 'search' ? s.withSearchIcon : ''}
    ${variant === 'password' ? s.withShowPasswordIcon : ''}
`.trim()

    const renderShowPassword = () => {
        if (variant === "password") {
            const Icon = showPassword ? EyeIconOff : EyeIcon
            return (
                <button
                    type="button"
                    className={s.showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    disabled={disabled}
                >
                    <Icon/>
                </button>
            )
        }
        return null
    }

    const renderSearchIcon = () => {
        if (variant === "search") {
            return (
                <span className={s.searchIcon}>
                        <SearchIcon/>
                    </span>
            )
        }
        return null
    }

    return (
        <div className={s.field}>
            {label && <label className={s.label}>{label}</label>}
            <div className={s.wrapper}>
                {renderSearchIcon()}
                <input type={variant === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                       className={inputClassName} disabled={disabled}
                       {...restProps}/>
                {renderShowPassword()}
            </div>
            {error && <span className={s.errorText}>{errorText}</span>}
        </div>
    )
}