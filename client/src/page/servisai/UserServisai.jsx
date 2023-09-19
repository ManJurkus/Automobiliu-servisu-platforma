import { Title } from "../../components/Title";
import { ServisoTable } from "../../components/servisu-table/ServisoTable";


export function UserServisai() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Mano Servisai' uri="/servisai/new" />
                </div>
            
                <div className="col-12">
                    <ServisoTable/>
                </div>
            </div>
        </div>
    )
}