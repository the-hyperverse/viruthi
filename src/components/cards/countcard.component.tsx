import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CountViewModel } from "../viewmodels/viewmodels";

export default function CountCard({ countData, ...props }: { countData: CountViewModel & React.ComponentPropsWithoutRef<typeof Card> }) {
    const formattedAmount: string = countData.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    return (
        <Card {...props} >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{countData.title}</CardTitle>
                <countData.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{countData.isUnitPrefix ? countData.unit + formattedAmount : formattedAmount + countData.unit}</div>
                <p className="text-xs text-muted-foreground">
                    {countData.diff > 0 ? '+' + countData.diff : countData.diff}{countData.isDiffPercentage ? '%' : ''} from last month
                </p>
            </CardContent>
        </Card>
    )
}