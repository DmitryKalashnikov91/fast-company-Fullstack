import { React, useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import MultySelectField from "../../common/form/multySelectField";

const EditUserPage = ({ match }) => {
    const [data, setData] = useState({ name: "", email: "", qualities: [], profession: "" });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const { userId } = match.params;
    console.log(match.params.userId);
    useEffect(() => {
        api.users.getById(userId).then((data) => setData({ name: data.name, email: data.email }));
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
    console.log(qualities);
    const handleChange = (e) => {
        setData(e.target.value);
    };
    const handleQualitiesChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-4 shadow p-4">
                <form>
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
                        />
                    </div>
                    <SelectField
                        label="Выбери свою профессию"
                        defaultOption={data.profession}
                        options={professions}
                        name="profession"
                        onChange={handleQualitiesChange}
                        value={data.profession}
                    />
                    <MultySelectField
                        options={qualities}
                        onChange={handleQualitiesChange}
                        defaultValue={data.qualities}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleQualitiesChange}
                        label="Выберите ваш пол"
                    />
                    <button className="btn btn-primary w-100 mx-auto">Сохранить</button>
                </form>
            </div>
        </div>
    );
};
EditUserPage.propTypes = {
    match: PropTypes.object
};

export default EditUserPage;
