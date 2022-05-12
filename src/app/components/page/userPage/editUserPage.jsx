import { React, useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import PropTypes from "prop-types";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import MultySelectField from "../../common/form/multySelectField";

const EditUserPage = ({ match }) => {
    const [data, setData] = useState({ name: "", email: "" });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const { userId } = match.params;

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    useEffect(() => {
        api.users.getById(userId).then((data) => setData({ name: data.name, email: data.email, sex: "" }));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((q) => {
            const qualitiesList = Object.keys(q).map((optionName) => ({
                value: q[optionName]._id,
                label: q[optionName].name,
                color: q[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (e) => {
        setData(e.target.value);
    };
    const handleSave = (e) => {
        e.preventDefault();
        console.log("save");
        console.log(data.profession);
    };
    const handleDataChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-4 shadow p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label
                            htmlFor="name"
                            className="form-label">Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <label
                            htmlFor="name"
                            className="form-label">Эл. почта
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                    </div>
                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption={data.profession}
                        options={professions}
                        name="profession"
                        onChange={handleDataChange}
                        value={data.profession}
                        error={errors.profession}
                    />
                    <MultySelectField
                        options={qualities}
                        onChange={handleDataChange}
                        defaultValue={qualities.label}
                        name="qualities"
                        label="Выберите ваши качества"
                        value={qualities.label}
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleDataChange}
                        label="Выберите ваш пол"
                    />
                    <button className="btn btn-primary w-100 mx-auto" onClick={handleSave} disabled={!isValid}>Сохранить</button>
                </form>
            </div>
        </div>
    );
};
EditUserPage.propTypes = {
    match: PropTypes.object
};

export default EditUserPage;
