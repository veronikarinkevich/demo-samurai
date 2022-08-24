import React from "react";
import s from './FormsControls.module.css';
import { Field } from "redux-form";

const Element = Element => ({ input, meta: {touched,error}, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <Element {...input} {...props} />
            {hasError && <span> {error} </span>}
        </div>
    );
};



export const Textarea = Element("textarea");

export const Input = Element("input");

export const createField = (placeholder, name, validate, component, props = {}, text = " ") => (
    <div>
    <Field placeholder={placeholder} name={name}
           validate={validate}
           component={component}
           {...props}/>{text}
</div>
)