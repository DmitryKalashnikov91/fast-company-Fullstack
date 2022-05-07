import { React, useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultySelectField from "../common/form/multySelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Эл. почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль дожен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль дожен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        license: {
            isRequired: {
                message: "Вы не можете использовть наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Эл. почта" name="email" value={data.email} onChange={handleChange} error={errors.email}/>
            <TextField label="Пароль" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password}/>
            <SelectField
                label="Выберите вашу профессию"
                defaultOption="Choose..."
                onChange={handleChange}
                options={professions}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "feMale" },
                    { name: "Other", value: "Other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultySelectField options={qualities} onChange={handleChange} name="qualities" label="Выберите ваши качества"/>
            <CheckBoxField value={data.license} onChange={handleChange} name="license" error={errors.license}>Подтвердить <a>лицензионное соглашение</a></CheckBoxField>
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    );
};

export default RegisterForm;
