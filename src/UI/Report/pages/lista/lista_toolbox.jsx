import { IoIosSearch } from "react-icons/io";

export default function ListaToolbox({ path }) {
    return (
        <>
            <div className="table_lista_report_toolboxBar">
                <div className="table_lista_report_toolboxBar_pathDiv">
                    {path}
                </div>
                <div className="table_lista_report_toolboxBar_searchDiv">
                    <div>
                        <IoIosSearch />
                    </div>
                    <input />
                </div>
            </div>
        </>
    );
};