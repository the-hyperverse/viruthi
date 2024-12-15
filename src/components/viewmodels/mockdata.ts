import { ChartNoAxesCombined, FolderDown, FolderUp, HandCoins, Landmark, LifeBuoy, Send, SquareTerminal } from "lucide-react";
import { NavDataViewModel } from "./viewmodels";

export const NavData: NavDataViewModel = {
    user: {
        name: "Narendran",
        email: "i-endran.com",
        avatar: "assets/images/dp-black.png",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Asset",
            url: "#",
            icon: ChartNoAxesCombined,
            items: [
                {
                    title: "IN Stocks",
                    url: "#",
                },
                {
                    title: "US Stocks",
                    url: "#",
                },
                {
                    title: "Mutual Funds",
                    url: "#",
                },
                {
                    title: "Gold",
                    url: "#",
                },
            ],
        },
        {
            title: "Debt",
            url: "#",
            icon: HandCoins,
            items: [
                {
                    title: "Mortage",
                    url: "#",
                },
                {
                    title: "EMI",
                    url: "#",
                },
            ],
        },
        {
            title: "Insurance",
            url: "#",
            icon: Landmark,
            items: [
                {
                    title: "Life Insurance",
                    url: "#",
                },
                {
                    title: "Health Insurance",
                    url: "#",
                },
                {
                    title: "Vehicle Insurance",
                    url: "#",
                },
            ],
        }
    ],
    navSettings: [
        {
            title: "Import Data",
            url: "#",
            icon: FolderDown,
        },
        {
            title: "Export Data",
            url: "#",
            icon: FolderUp,
        }
    ],
    navSupport: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
}