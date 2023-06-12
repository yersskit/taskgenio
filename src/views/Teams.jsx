import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Common/Modal";
import { CREATE_MODE, INPUT_NAME, TEAM_ENTITY } from "../utils/consts";
import TextInput from "./../components/Inputs/TextInput";
import { createTeam, getTeams } from "../store/teams";
import ViewHeader from "../components/Layout/ViewHeader";
import ViewContent from "../components/Layout/ViewContent";
import View from "../components/Layout/View";
import Table from "./../components/Common/Table/Table";
import { Link } from "react-router-dom";
import { TEAMS_PATH } from "../utils/routes";

const Teams = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createTeamRef = useRef();

  const { teams, isLoading, error } = useSelector((state) => state.teams);

  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [enableSubmit, setEnableSubmit] = useState(false);

  const onChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const checkFormValid = () => {
    let valid = true;

    const dataLength = Object.keys(formData).length;
    const errorsLength = Object.keys(errors).length;

    if (dataLength === errorsLength) {
      for (let i = 0; i < Object.keys(errors).length; i++) {
        const element = Object.keys(errors)[i];

        if (errors[element].length > 0) {
          valid = false;
        }
      }
    } else {
      valid = false;
    }

    setEnableSubmit(valid);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createTeam(formData));

    if (createTeamRef.current) {
      createTeamRef.current.checked = false;
    }

    setFormData({ name: "" });
  };

  const handleOpenModal = () => {
    setFormData({ name: "" });
    createTeamRef.current.checked = true;
  };

  useEffect(() => {
    checkFormValid();
  }, [formData]);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  return (
    <Layout>
      <View>
        <ViewHeader title={t("menu.teams")}>
          <button
            onClick={handleOpenModal}
            className="btn btn-sm btn-primary normal-case"
            disabled={error || isLoading}
          >
            {t(`actions.${CREATE_MODE}`) + " " + t(`entities.${TEAM_ENTITY}`)}
          </button>
        </ViewHeader>
        <ViewContent>
          <Modal
            mode={CREATE_MODE}
            entity={t(`entities.${TEAM_ENTITY}`)}
            composedKey={`${CREATE_MODE}__${TEAM_ENTITY}`}
            modalRef={createTeamRef}
          >
            <form action="">
              <TextInput
                name={INPUT_NAME}
                required
                disabled={isLoading}
                onChange={onChange}
                value={formData[INPUT_NAME]}
                errors={errors[INPUT_NAME]}
                setErrors={setErrors}
              />
              <div className="flex flex-col mt-6">
                <button
                  type="submit"
                  disabled={!enableSubmit || isLoading}
                  onClick={onSubmit}
                  className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                >
                  {t("actions.save")}
                </button>
              </div>
            </form>
          </Modal>
          <Table
            name={TEAM_ENTITY}
            data={teams}
            hidden={[
              "$id",
              "$updatedAt",
              "$permissions",
              "$collectionId",
              "$databaseId",
            ]}
            customCells={[
              {
                column: "name",
                component: (row) => (
                  <Link to={`${TEAMS_PATH}/${row.$id}?teamName=${row.name}`}>
                    {row.name}
                  </Link>
                ),
              },
            ]}
          />
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Teams;
