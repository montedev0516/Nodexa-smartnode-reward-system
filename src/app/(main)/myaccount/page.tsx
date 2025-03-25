"use client"
import Image from "next/image";
import { useState } from "react";

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    placeholder: string;
    icon: string;
    showPasswordToggle?: boolean;
    value: string;
    onChange: (value: string) => void;
}

const InputField = ({ 
    label, 
    id, 
    type, 
    placeholder, 
    icon, 
    showPasswordToggle = false,
    value,
    onChange 
}: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col justify-center items-start pb-[35px]">
            <label htmlFor={id} className="text-[18px] font-semibold text-white font-family-sora px-[5px] pb-[15px]">
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-[56px] w-[300px] sm:w-[400px] px-[45px] border-1 border-[#00AEB9] rounded-[8px] 
                    focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-[#B2A6A6] 
                    placeholder:text-[18px] placeholder:font-family-satoshi_variable bg-[#1C1840] text-white"
                    placeholder={placeholder}
                />
                <Image 
                    src={icon} 
                    alt={id} 
                    width={22} 
                    height={18} 
                    className="w-[22px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2" 
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded-full transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <Image 
                            src={showPassword ? "/myaccount/eye.svg" : "/myaccount/no-eye.svg"} 
                            alt={showPassword ? "Hide password" : "Show password"} 
                            width={22} 
                            height={18} 
                            className="w-[22px] h-[18px]" 
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

const Divider = () => (
    <div className="w-full py-[90px]">
        <div className="bg-gradient-to-r from-[#00AEB900] via-[#00AEB9] to-[#00AEB900] from-[0%] via-[50%] to-[100%] h-[2px] w-full" />
    </div>
);

const SectionTitle = ({ title }: { title: string }) => (
    <h1 className="text-[30px] font-bold text-white font-family-sora px-[5px] pb-[50px]">
        {title}
    </h1>
);

export default function MyAccount() {
    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        verifyPassword: ""
    });
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const handleInputChange = (field: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handle2FAToggle = (enable: boolean) => {
        setIs2FAEnabled(enable);
        // TODO: Implement 2FA logic
    };

    const handleDeleteAccount = () => {
        // TODO: Implement delete account logic
        console.log("Delete account clicked");
    };

    return (
        <div className="min-h-screen bg-[#080525] px-[50px] lg:px-[100px] pt-[60px] sm:pt-[120px]">
            {/* Email Section */}
            <div className="flex flex-col justify-center items-start">
                <SectionTitle title="My Account" />
                <InputField
                    label="Email Address"
                    id="email_address"
                    type="email"
                    placeholder="georgeb@gmail.com"
                    icon="/myaccount/letter-icon.svg"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                />
            </div>

            <Divider />

            {/* Password Section */}
            <div className="flex flex-col justify-center items-start">
                <SectionTitle title="Password" />
                <InputField
                    label="Current Password"
                    id="current_password"
                    type="password"
                    placeholder="********"
                    icon="/myaccount/lock-icon.svg"
                    showPasswordToggle
                    value={formData.currentPassword}
                    onChange={handleInputChange("currentPassword")}
                />
                <InputField
                    label="New Password"
                    id="new_password"
                    type="password"
                    placeholder="********"
                    icon="/myaccount/lock-icon.svg"
                    showPasswordToggle
                    value={formData.newPassword}
                    onChange={handleInputChange("newPassword")}
                />
                <InputField
                    label="Verify New Password"
                    id="verify_password"
                    type="password"
                    placeholder="********"
                    icon="/myaccount/lock-icon.svg"
                    showPasswordToggle
                    value={formData.verifyPassword}
                    onChange={handleInputChange("verifyPassword")}
                />
            </div>

            <Divider />

            {/* 2FA Section */}
            <div className="flex flex-col justify-center items-start gap-[25px] pt-[45px]">
                <SectionTitle title="Two Factor Authentication" />
                <h2 className="text-[22px] font-regular text-white font-family-sora">
                    Enable 2FA as extra layer of security
                </h2>
                <div className="flex flex-row justify-start items-center gap-[10px]">
                    <span className="text-[20px] font-regular text-white font-family-sora">2FA is</span>
                    <span className="text-[20px] font-bold text-white font-family-sora">
                        {is2FAEnabled ? "Enabled" : "Disabled"}
                    </span>
                </div>
                <div className="flex flex-row justify-start items-center gap-[20px]">
                    <button 
                        onClick={() => handle2FAToggle(true)}
                        className="w-[109px] h-[35px] bg-[#3CDD22] text-white text-[14px] font-family-sora font-bold 
                        px-[25px] py-[7px] rounded-[32px] hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        ENABLE
                    </button>
                    <button 
                        onClick={() => handle2FAToggle(false)}
                        className="w-[109px] h-[35px] bg-[#FF5252] text-white text-[14px] font-family-sora font-bold 
                        px-[25px] py-[7px] rounded-[32px] hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        DISABLE
                    </button>
                </div>
            </div>

            <Divider />

            {/* Delete Account Section */}
            <div className="flex flex-col justify-center items-start gap-[25px] pt-[64px] pb-[100px] sm:pb-[200px]">
                <SectionTitle title="Delete Account" />
                <button 
                    onClick={handleDeleteAccount}
                    className="flex flex-row justify-center items-center gap-[10px] w-[121px] h-[36px] 
                    bg-[#FF5252] px-[25px] py-[7px] rounded-[32px] hover:opacity-90 transition-opacity"
                >
                    <span className="text-white text-[14px] font-family-sora font-bold">DELETE</span>
                    <Image 
                        src="/myaccount/trash-icon.svg" 
                        alt="trash" 
                        width={16} 
                        height={17} 
                        className="w-[16px] h-[17px]" 
                    />
                </button>
            </div>
        </div>
    );
}