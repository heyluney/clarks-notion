import { useParams } from "react-router";

const Page = () => {
    const id = useParams();
    console.log('page_id is', id);
    return (
    <div>
        This is a page!
    </div>
    )
}

export default Page;