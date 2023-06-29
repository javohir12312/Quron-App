import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: false,
  hamburger: false,
  SelectedLang: "",
  sura: null,
  isPlay: null,
  isPause: true,
  languages: {
    en: {
      language: "en",
      name: "myQuran"
    },
    uz: {
      language: "uz",
      name: "Mой Коран"
    },
    ru: {
      language: "ru",
      name: "Quronim"
    }
  }
};

const modeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = !state.mode;
    },
    openHamburger: (state) => {
      state.hamburger = true;
    },
    closeHamburger: (state) => {
      state.hamburger = false;
    },
    ChangeLanguages: (state, action) => {
      state.SelectedLang = action.payload;
    },
    enterSura: (state, action) => {
      state.sura = action.payload;
    },
    PlayIs: (state, payload) => {
      state.isPlay = payload.payload;
    }
  }
});

export const {
  changeMode,
  openHamburger,
  closeHamburger,
  ChangeLanguages,
  enterSura,
  PlayIs
} = modeSlice.actions;
export default modeSlice.reducer;
