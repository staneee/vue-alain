import { IMenu } from "@/shared/states/modules/menu.state";

const menus: IMenu[] = [
    {
        name: '/dashborad',
        text: '工作台',
        icon: 'dashboard',
        children: [
            {
                name: '/workplace',
                text: '工作台',
                link: '/workplace',
            },
            {
                name: '/analysis',
                text: '分析页',
                link: '/analysis',
                icon: 'info',
            },
            {
                name: '/monitor',
                text: '监控页',
                link: '/monitor',
            },
        ]
    },
    {
        name: '/form',
        text: '表单页',
        icon: 'form',
        children: [
            {
                name: '/form/basic',
                text: '基础表单',
                link: '/form/basic',
            },
            {
                name: '/form/step',
                text: '分步表单',
                link: '/form/step',
            },
            {
                name: '/form/advanced',
                text: '高级表单',
                link: '/form/advanced',
            }
        ]
    }
]


export default menus;