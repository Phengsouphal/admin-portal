import { defineStore } from 'pinia'
// import { Message } from 'view-ui-plus'
import { ref, readonly } from 'vue'
import { useRouter } from 'vue-router'
import RouteName from '~/constants/router-name'

// import { routeName } from "@/router/route";

export const useLayoutStore = defineStore('layout', () => {
  const activeRoute = ref('')
  const listTabPannel = ref([] as any)
  const router = useRouter()
  const activeMenu = ref('')

  const showNotification = ref(false)

  const isDark = ref(false)

  const includeArr = ref([] as any)

  const clearAllTab = () => {
    listTabPannel.value = []
    includeArr.value = []
  }

  const toggleIsDark = (value: boolean) => {
    isDark.value = value
  }

  const switchNavbarPage = (_route: { id: string; routeName: string }) => {
    activeRoute.value = _route.routeName
    router.push({ name: _route.routeName })
    checkIfTabExist(_route)
  }

  const closeOtherTab = () => {
    const currentRoute = router.currentRoute.value.name
    let currentTab = null as any
    listTabPannel.value = listTabPannel.value.filter((item: any, _: any) => {
      if (item.routeName == currentRoute) {
        currentTab = item
        return item
      }
    })

    if (currentTab) {
      includeArr.value = includeArr.value.filter(
        (item: any) => item === mapComponentObj(currentTab?.routeName)
      )
    }

    // Message.success('清除标签页')
  }

  const handleCloseTab = (tab: any) => {
    removeIncludeArr(tab)

    if (listTabPannel.value.length == 1) {
      listTabPannel.value = []
      return
    }

    const idx = listTabPannel.value.findIndex((e: any) => e.routeName == tab)
    // check if remove tab index is zero and tap on index 1
    if (idx == 0) {
      switchPage(listTabPannel.value[1].routeName)
    } else {
      switchPage(listTabPannel.value[idx - 1].routeName)
    }

    listTabPannel.value.splice(idx, 1)
  }

  const switchPage = (routeName: any) => {
    activeRoute.value = routeName
    router.push({ name: routeName })
  }

  const setIncludeArr = (componentName: any) => {
    const isIncluded = includeArr.value.includes(componentName)
    if (!isIncluded) {
      includeArr.value.push(componentName)
    }
  }

  const checkIfTabExist = (_route: { id?: string; routeName?: string }) => {
    setIncludeArr(_route.routeName)
    if (listTabPannel.value.length > 0) {
      const isExited = listTabPannel.value.filter((x: any) => x?.id == _route.id)
      if (isExited.length > 0) {
        return
      }
    }

    listTabPannel.value.push(_route)
  }

  const mapComponentObj = (key: any) => {
    var componentNameObj = {} as any
    // componentNameObj[routeName.COMPANY_TAB] = 'company'
    // componentNameObj[RouteName.FAQ] = RouteName.FAQ
    // //
    // componentNameObj[RouteName.ARTICLE] = RouteName.ARTICLE

    return componentNameObj[key]
  }

  const removeIncludeArr = (tab: any) => {
    const removeComponent = mapComponentObj(tab)
    includeArr.value = includeArr.value.filter((item: any, _index: any) => {
      if (item != removeComponent) {
        return item
      }
    })
  }

  return {
    //Function
    handleCloseTab,
    switchPage,
    clearAllTab,
    closeOtherTab,
    setIncludeArr,
    switchNavbarPage,
    checkIfTabExist,
    toggleIsDark,
    //Property

    showNotification,
    listTabPannel,
    activeMenu,
    activeRoute,
    includeArr: readonly(includeArr),
    isDark: readonly(isDark)
  }
})
