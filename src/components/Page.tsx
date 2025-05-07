import { useParams } from "react-router";
import { PageComponent } from "../backend/component/component_type";

interface PageProps {
    page: PageComponent
}

const Page : React.FC<PageProps> = (props: PageProps) => {
    const { page } = props;

    return (

    <div>
        <div>{page.title}</div>
        <div>{page.emoji}</div>
    </div>
    )
}

export default Page;