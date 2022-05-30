import { React, useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
// import { Link } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import MultySelectField from "../../common/form/multySelectField";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";

const EditUserPage = ({ match }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const history = useHistory();
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
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
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
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);
    const handleDataChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    console.log(professions);
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="col-md-6 offset-md-4 shadow p-4">
                {!isLoading && Object.keys(professions).length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <TextField
                                label="Имя"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleDataChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleDataChange}
                                error={errors.email}
                            />
                        </div>
                        <SelectField
                            label="Выбери свою профессию"
                            options={professions}
                            name="profession"
                            onChange={handleDataChange}
                            value={data.profession}
                            error={errors.profession}
                        />
                        <MultySelectField
                            options={qualities}
                            onChange={handleDataChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                            value={data.qualities}
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

                        <button
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Сохранить
                        </button>
                    </form>
                ) : (
                    "....loading"
                )}
            </div>
        </div>
    );
};
EditUserPage.propTypes = {
    match: PropTypes.object
};

export default EditUserPage;
