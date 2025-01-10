import { IoArrowBackCircle } from "react-icons/io5";

export default function GeneralModal({ Content, Title, OnExit, Width, Height }) {
    return (
        <>
            <div className='confirm_modal_overlay zindex1000'>
                <div
                    className="GeneralModal_MainDiv"
                    style={{ width: Width ? Width : "", height: Height ? Height : "" }}
                >
                    <div className="GeneralModal_Header">
                        {Title}
                        <div className="GeneralModal_Btn_Exit">
                            <IoArrowBackCircle onClick={OnExit} />
                        </div>
                    </div>
                    <Content />
                </div>
            </div>
        </>
    );
};