import { useFormik } from "formik";
import * as Yup from 'yup';
import { InputWrap } from "./styles.js";

const validation = Yup.object().shape({
    firstName: Yup.string()
        .required("Ім'я обов'язкове для заповнення"),
    email: Yup.string()
        .email('Некоректний формат email')
        .required('Електронна пошта обов`язкова для заповнення'),
    tel: Yup.string()
        .matches(/^\d{12}$/, 'Телефон повинен містити лише цифри та бути довжиною 12')
        .required('Телефон обов`язковий для заповнення'),
})

export const Form = () => {
    const {
        handleBlur,
        handleChange,
        values, handleSubmit, errors,
        touched,
        isValid,
        dirty
    } = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            tel: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <InputWrap>
                <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="firstName"
                    value={values.firstName}
                />
                {touched.firstName && errors.firstName ? <span>{errors.firstName}</span> : null}
            </InputWrap>
            <InputWrap>
                <input
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    value={values.email}
                />
                {touched.email && errors.email ? <span>{errors.email}</span> : null}
            </InputWrap>
            <InputWrap>
                <input
                    type="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="tel"
                    value={values.tel}
                />
                {touched.tel && errors.tel ? <span>{errors.tel}</span> : null}
            </InputWrap>
            <button type="submit" disabled={!(isValid && dirty)}>Submit</button>
        </form>
    )
}
