import { contants } from "."

export const setOpenAdd=payload=>({
    type:contants.SET_OPEN_ADD,
    payload
})
export const setOpenEdit=payload=>({
    type:contants.SET_OPEN_EDIT,
    payload
})
export const setDeleteAll=payload=>({
    type:contants.SET_DELETE_ALL,
    payload
})

export const setMainPage=payload=>({
    type:contants.SET_MAIN_PAGE,
    payload
})
export const setDeleteItemSelected=payload=>({
    type:contants.SET_DELETE_ITEM_SELECTED,
    payload
})
export const setAddSuccess=payload=>({
    type:contants.ADD_SUCCESS,
    payload
})

export const setIdDelete=payload=>({
    type:contants.SET_ID_DELETE,
    payload
})


export const setAddTeam=payload=>({
    type:contants.SET_ADD_TEAM,
    payload
})


