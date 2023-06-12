import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Common/Modal";
import { CREATE_MODE, INPUT_NAME, TEAM_MEMBER_ENTITY } from "../utils/consts";
import TextInput from "./../components/Inputs/TextInput";
import { createTeamMember, getTeamMembers } from "../store/teams";
import ViewHeader from "../components/Layout/ViewHeader";
import ViewContent from "../components/Layout/ViewContent";
import View from "../components/Layout/View";
import Table from "./../components/Common/Table/Table";
import { useParams } from "react-router-dom";
import useSearchParams from "../hooks/useSearchParams";
import Delete from "../components/Common/Actions/Delete";

const Team = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createTeamMemberRef = useRef();
  const { teamId } = useParams();

  const { getParam } = useSearchParams();

  const { teamMembers, isLoading, error } = useSelector((state) => state.teams);

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
    dispatch(createTeamMember({ ...formData, teamId }));

    if (createTeamMemberRef.current) {
      createTeamMemberRef.current.checked = false;
    }

    setFormData({ name: "" });
  };

  const handleOpenModal = () => {
    setFormData({ name: "" });
    createTeamMemberRef.current.checked = true;
  };

  useEffect(() => {
    checkFormValid();
  }, [formData]);

  useEffect(() => {
    dispatch(getTeamMembers(teamId));
  }, []);

  return (
    <Layout>
      <View>
        <ViewHeader title={t("menu.teamMembers")} name={getParam("teamName")}>
          <button
            onClick={handleOpenModal}
            className="btn btn-sm btn-primary normal-case"
            disabled={error || isLoading}
          >
            {t(`actions.${CREATE_MODE}`) +
              " " +
              t(`entities.${TEAM_MEMBER_ENTITY}`)}
          </button>
        </ViewHeader>
        <ViewContent>
          <Modal
            mode={CREATE_MODE}
            entity={t(`entities.${TEAM_MEMBER_ENTITY}`)}
            composedKey={`${CREATE_MODE}__${TEAM_MEMBER_ENTITY}`}
            modalRef={createTeamMemberRef}
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
            name={TEAM_MEMBER_ENTITY}
            data={teamMembers}
            hidden={[
              "$id",
              "$updatedAt",
              "$permissions",
              "$collectionId",
              "$databaseId",
              "teamId",
            ]}
            controls={(row) => (
              <>
                <Delete
                  id={row.$id}
                  action={() => {
                    console.log("delete", row.$id);
                  }}
                  entity={TEAM_MEMBER_ENTITY}
                />
              </>
            )}
          />
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Team;
