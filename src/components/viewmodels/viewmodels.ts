export interface UserViewModel {
    name: string,
    email: string,
    avatar: string
}

interface NavSubElementsViewModel{
    title: string,
    url: string
}

export interface NavElementsViewModel {
    title: string,
    url: string,
    icon: any,
    isActive?: boolean,
    items?: NavSubElementsViewModel[]
}

export interface NavDataViewModel {
    user: UserViewModel,
    navMain: NavElementsViewModel[],
    navSettings: NavElementsViewModel[],
    navSupport: NavElementsViewModel[]
}

export interface CountViewModel {
    title: string,
    amount: number,
    unit: string,
    isUnitPrefix: boolean,
    diff: number,
    isDiffPercentage: boolean,
    icon: any
}