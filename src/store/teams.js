import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ID, Query } from 'appwrite';
import { database, databaseId } from '../utils/appwriteConfig';
import { team_members_collection_id, teams_collection_id } from '../utils/collections';
import { decrementLoadingCounter, incrementLoadingCounter } from './loader';
import { addToast } from './toast';
import {
  ACTIVE_STATUS,
  CREATE_TEAM,
  CREATE_TEAM_MEMBER,
  LOAD_TEAMS,
  LOAD_TEAM_MEMBERS,
  TYPE_ERROR,
  TYPE_SUCCESS
} from '../utils/consts';

const initialState = {
  teams: [],
  teamMembers: [],
  members: [],
  isLoading: false,
  error: null
};

export const createTeam = createAsyncThunk('teams/createTeam', async (payload, { dispatch }) => {
  try {
    let response = await database.createDocument(databaseId, teams_collection_id, ID.unique(), {
      ...payload
    });

    dispatch(addToast({ type: TYPE_SUCCESS, body: CREATE_TEAM }));
    return response;
  } catch (error) {
    dispatch(addToast({ type: TYPE_ERROR, body: CREATE_TEAM }));
    throw new Error(error.code);
  }
});

export const getTeams = createAsyncThunk('teams/getTeams', async (payload, { dispatch }) => {
  try {
    dispatch(incrementLoadingCounter());
    let response = await database.listDocuments(databaseId, teams_collection_id, [
      Query.equal('status', ACTIVE_STATUS),
      Query.equal('organization', payload)
    ]);
    dispatch(decrementLoadingCounter());
    return response;
  } catch (error) {
    dispatch(decrementLoadingCounter());
    dispatch(addToast({ type: TYPE_ERROR, body: LOAD_TEAMS }));
    throw new Error(error.code);
  }
});

export const createTeamMember = createAsyncThunk(
  'teams/createTeamMember',
  async (payload, { dispatch }) => {
    try {
      let response = await database.createDocument(
        databaseId,
        team_members_collection_id,
        ID.unique(),
        { ...payload }
      );

      dispatch(addToast({ type: TYPE_SUCCESS, body: CREATE_TEAM_MEMBER }));
      return response;
    } catch (error) {
      dispatch(addToast({ type: TYPE_ERROR, body: CREATE_TEAM_MEMBER }));
      throw new Error(error.code);
    }
  }
);

export const createMember = createAsyncThunk(
  'teams/createMember',
  async (payload, { dispatch }) => {
    try {
      let response = await database.createDocument(
        databaseId,
        team_members_collection_id,
        ID.unique(),
        { ...payload }
      );

      dispatch(addToast({ type: TYPE_SUCCESS, body: CREATE_TEAM_MEMBER }));
      return response;
    } catch (error) {
      dispatch(addToast({ type: TYPE_ERROR, body: CREATE_TEAM_MEMBER }));
      throw new Error(error.code);
    }
  }
);

export const getTeamMembers = createAsyncThunk(
  'teams/getTeamMembers',
  async (payload, { dispatch }) => {
    try {
      dispatch(incrementLoadingCounter());
      let response = await database.listDocuments(databaseId, team_members_collection_id, [
        Query.equal('teamId', payload),
        Query.equal('status', ACTIVE_STATUS)
      ]);
      dispatch(decrementLoadingCounter());
      return response;
    } catch (error) {
      dispatch(decrementLoadingCounter());
      dispatch(addToast({ type: TYPE_ERROR, body: LOAD_TEAM_MEMBERS }));
      throw new Error(error.code);
    }
  }
);

export const getMembers = createAsyncThunk('teams/getMembers', async (payload, { dispatch }) => {
  try {
    dispatch(incrementLoadingCounter());
    let response = await database.listDocuments(databaseId, team_members_collection_id, [
      Query.equal('status', ACTIVE_STATUS),
      Query.equal('organization', payload)
    ]);
    dispatch(decrementLoadingCounter());
    return response;
  } catch (error) {
    dispatch(decrementLoadingCounter());
    dispatch(addToast({ type: TYPE_ERROR, body: LOAD_TEAM_MEMBERS }));
    throw new Error(error.code);
  }
});

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTeam.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.teams.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTeams.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.teams = action.payload.documents;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getTeams.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(createTeamMember.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTeamMember.fulfilled, (state, action) => {
      state.teamMembers.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createTeamMember.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTeamMembers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTeamMembers.fulfilled, (state, action) => {
      state.teamMembers = action.payload.documents;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getTeamMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getMembers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getMembers.fulfilled, (state, action) => {
      state.members = action.payload.documents;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export default teamSlice.reducer;
