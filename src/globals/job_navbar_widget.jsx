function JobNavbar_Widget({ openDashboard, Text, Icon, onClick, Number }) {
    return (
        <>
            <div 
                onClick={onClick} 
                className={`dashboard_drawer_widget ${openDashboard ? 'open' : ''}`}
            >
                {Icon &&
                    <div 
                        className={`dashboard_drawer_widget_icon ${openDashboard ? 'open' : ''}`}
                    >
                        <Icon />
                    </div>
                }
                <div 
                    className={`dashboard_drawer_widget_description ${openDashboard ? 'open' : ''}`}
                >
                    {Text}
                </div>
                {Number &&
                    <div 
                        className={`dashboard_drawer_widget_number ${openDashboard ? 'open' : ''}`}
                    >
                        {Number}
                    </div>
                }
            </div>
        </>
    );
};

export default JobNavbar_Widget;
