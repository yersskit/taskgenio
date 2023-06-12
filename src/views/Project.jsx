import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Common/Modal";
import { CREATE_MODE, PROJECT_ENTITY, TASK_ENTITY } from "../utils/consts";
import ViewHeader from "../components/Layout/ViewHeader";
import ViewContent from "../components/Layout/ViewContent";
import View from "../components/Layout/View";
import { getProjects } from "../store/projects";
import useSearchParams from "../hooks/useSearchParams";
import BoardView from "../ViewTypes/BoardView";

const Project = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getParam } = useSearchParams();
  const createTaskRef = useRef();

  const { projects, error, isLoading } = useSelector((state) => state.projects);

  const handleOpenModal = () => {
    createTaskRef.current.checked = true;
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <Layout>
      <View>
        <ViewHeader title={t("menu.tasks")} name={getParam("projectName")}>
          <button
            onClick={handleOpenModal}
            className="btn btn-sm btn-primary normal-case"
            disabled={error || isLoading}
          >
            {t(`actions.${CREATE_MODE}`) + " " + t(`entities.${TASK_ENTITY}`)}
          </button>
        </ViewHeader>
        <ViewContent>
          <Modal
            mode={CREATE_MODE}
            entity={t(`entities.${TASK_ENTITY}`)}
            composedKey={`${CREATE_MODE}__${TASK_ENTITY}`}
            modalRef={createTaskRef}
          ></Modal>

          <BoardView />
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Project;
