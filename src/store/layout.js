import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebarHidden: false,
}

export const handleCloseSidebar = ({ storeInSession }) => (dispatch) => {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar.classList.contains("hidden")) {
        sidebar.classList.add("hidden");
    }

    if (storeInSession) {
        sessionStorage.setItem("sidebarHidden", true);
    }

    dispatch(toggleSidebar(true));
};

export const handleOpenSidebar = ({ removeFromSession }) => (dispatch) => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.classList.contains("hidden")) {
        sidebar.classList.remove("hidden");
    }

    if (removeFromSession) {
        sessionStorage.removeItem("sidebarHidden");
    }

    dispatch(toggleSidebar(false));
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSidebar: (state, { payload }) => {
            state.sidebarHidden = payload
        },
    },
})

export const { toggleSidebar } = layoutSlice.actions

export default layoutSlice.reducer
