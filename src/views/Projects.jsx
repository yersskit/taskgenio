import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Common/Modal";
import { CREATE_MODE, INPUT_NAME, PROJECT_ENTITY } from "../utils/consts";
import TextInput from "./../components/Inputs/TextInput";
import ViewHeader from "../components/Layout/ViewHeader";
import ViewContent from "../components/Layout/ViewContent";
import View from "../components/Layout/View";
import Table from "./../components/Common/Table/Table";
import Delete from "../components/Common/Actions/Delete";
import { createProject, getProjects } from "../store/projects";
import { PROJECTS_PATH } from "../utils/routes";
import { Link } from "react-router-dom";

const Projects = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createProjectRef = useRef();

  const { projects, error, isLoading } = useSelector((state) => state.projects);

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
    dispatch(createProject({ ...formData }));

    if (createProjectRef.current) {
      createProjectRef.current.checked = false;
    }

    setFormData({ name: "" });
  };

  const handleOpenModal = () => {
    setFormData({ name: "" });
    createProjectRef.current.checked = true;
  };

  useEffect(() => {
    checkFormValid();
  }, [formData]);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <Layout>
      <View>
        <ViewHeader title={t("menu.projects")}>
          <button
            onClick={handleOpenModal}
            className="btn btn-sm btn-primary normal-case"
            disabled={error || isLoading}
          >
            {t(`actions.${CREATE_MODE}`) +
              " " +
              t(`entities.${PROJECT_ENTITY}`)}
          </button>
        </ViewHeader>
        <ViewContent>
          <Modal
            mode={CREATE_MODE}
            entity={t(`entities.${PROJECT_ENTITY}`)}
            composedKey={`${CREATE_MODE}__${PROJECT_ENTITY}`}
            modalRef={createProjectRef}
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
            name={PROJECT_ENTITY}
            data={projects}
            hidden={[
              "$id",
              "$updatedAt",
              "$permissions",
              "$collectionId",
              "$databaseId",
              "teamId",
            ]}
            customCells={[
              {
                column: "name",
                component: (row) => (
                  <Link
                    to={`${PROJECTS_PATH}/${row.$id}?projectName=${row.name}`}
                  >
                    {row.name}
                  </Link>
                ),
              },
            ]}
            controls={(row) => (
              <>
                <Delete
                  id={row.$id}
                  action={() => {
                    console.log("delete", row.$id);
                  }}
                  entity={PROJECT_ENTITY}
                />
              </>
            )}
          />
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Projects;
