import React from 'react';
import Layout from '../components/Layout';
import AccountSettings from '../components/AccountSettings';

const Settings: React.FC = () => {
    return (
        <Layout>
            <div className="p-4 md:p-8 animate-fade-in bg-slate-50 dark:bg-[#101922] min-h-full">
                <AccountSettings />
            </div>
        </Layout>
    );
};

export default Settings;
