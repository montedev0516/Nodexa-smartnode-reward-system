"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast from 'react-hot-toast';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal';

const accountSchema = z.object({
    email: z.string().email('Email is required'),
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(1, 'New password is required'),
    verifyPassword: z.string().min(1, 'Verify password is required'),
});

interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    placeholder: string;
    icon: string;
    showPasswordToggle?: boolean;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
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
    const { data: session, status } = useSession();
    const { isAuthenticated, isLoading: authLoading, user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        verifyPassword: ""
    });
    const [originalEmail, setOriginalEmail] = useState("");
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    // const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [is2FASetupOpen, setIs2FASetupOpen] = useState(false);
    const [is2FADisabled, setIs2FADisabled] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
    const [secret, setSecret] = useState<string | null>(null);

    const validateForm = () => {
        try {
            accountSchema.parse(formData);
            setErrors({});
            setIsValid(true);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {} as { [key: string]: string });
                setErrors(errorMessages);
            }
            setIsValid(false);
            return false;
        }
    }

    const handleInputChange = (field: string) => (value: string) => { 

        setFormData(prev => ({ ...prev, [field]: value }));

        // Check if email has changed from original
        if (field === "email" && value !== originalEmail) {
            setHasChanges(true);
        } else if (field === "email" && value === originalEmail) {
            // Only set hasChanges to false if we're not changing password
            if (!isPasswordChange) {
                setHasChanges(false);
            }
        }

        // Check if any password field has a value
        if (field === "currentPassword" || field === "newPassword" || field === "verifyPassword") {
            if (value) {
                setHasChanges(true);

                // If new password or verify password has a value, we're changing password
                if (field === "currentPassword" || field === "newPassword" || field === "verifyPassword") {
                    setIsPasswordChange(true);
                }
            } else if (!formData.currentPassword && !formData.newPassword && !formData.verifyPassword) {
                // Only set hasChanges to false if email hasn't changed
                if (formData.email === originalEmail) {
                    setHasChanges(false);
                }
                setIsPasswordChange(false);
            }
        }
    };

    const handleCancel = () => {
        // Reset form data to original values
        setFormData(prev => ({
            ...prev,
            email: originalEmail,
            currentPassword: "",
            newPassword: "",
            verifyPassword: ""
        }));
        setHasChanges(false);
        setErrors({});
        setIsPasswordChange(false);
    };

    const handle2FAToggle = async (enable: boolean) => {
        if (enable) {
            setIs2FASetupOpen(true);
            handle2FACreate();
        } else {
            setIs2FADisabled(true);
            try {
                const response = await fetch('/api/auth/2fa/disable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to disable 2FA');
                }

                setIs2FAEnabled(false);
                toast.success('2FA disabled successfully');
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Failed to disable 2FA');
            } finally {
                setIs2FADisabled(false);
            }
        }
    };

    const handle2FACreate = async () => {
        try {
            console.log("Enabling 2FA");
            console.log("formData.email", formData.email);
            const response = await fetch('/api/auth/2fa/enable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!response.ok) {
                throw new Error('Failed to enable 2FA');
            }

            const data = await response.json();
            console.log("data", data);

            const qrCode = data.qrCode;
            const backupCodes = data.backupCodes;
            const secret = data.secret;

            console.log("qrCode", qrCode);
            console.log("backupCodes", backupCodes);
            console.log("secret", secret);

            setQrCode(qrCode);
            setBackupCodes(backupCodes);
            setSecret(secret);

            // setIs2FASetupOpen(true);

            // setIs2FAEnabled(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to enable 2FA');
            throw error;
        }
    };
    
    // Store 2FA in the database
    const handle2FAActivate = async () => {
        try {
            console.log("Activating 2FA");
            console.log("secret", secret);
            console.log("email", formData.email);
            console.log("backupCodes", backupCodes);

            const response = await fetch('/api/auth/2fa/store2FA', {
                method: 'POST',
                headers: {
                   'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ secret, email: formData.email, backupCodes })
            });

            if (!response.ok) {
                throw new Error('Failed to store 2FA');
            }

            toast.success('2FA stored successfully');
      
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to activate 2FA');
            throw error;
        }
    };

    const handle2FAEnable = async () => {
        setIs2FASetupOpen(false);
        setIs2FAEnabled(true);
    };

    const handleDeleteAccount = async() => {
        // TODO: Implement delete account logic
        try {
            const response = await fetch('/api/auth/myaccount/deleteaccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email
                }),
            });

            if (!response.ok) {
                throw new Error('Invalid delete account');
            }
            toast.success('User account was deleted successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed Delete Account');
        } 
    };

    const handleUpdateAccount = async () => {
        setIsLoading(true);
        setErrors({});
        // setSuccessMessage(null);

        try {
            // Validate form first
            if (!validateForm()) {
                setIsLoading(false);
                return;
            }

            // Validate passwords match if updating password
            if (formData.newPassword && formData.newPassword !== formData.verifyPassword) {
                toast.error("New passwords do not match");
                setIsLoading(false);
                return;
            }

            // Validate current password is provided when changing password
            if (formData.newPassword && !formData.currentPassword) {
                toast.error("Current password is required to change password");
                setIsLoading(false);
                return;
            }

            console.log("formData", formData);

            // Prepare update data
            const updateData: any = {};
            if (formData.email) {
                updateData.email = formData.email;
            }

            if (formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            const response = await fetch("/api/auth/myaccount", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update account");
            }

            toast.success("Account updated successfully");
            // setSuccessMessage("Account updated successfully");

            // Update original email if it was changed
            if (formData.email !== originalEmail) {
                setOriginalEmail(formData.email);
            }

            // Clear password fields after successful update
            setFormData(prev => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                verifyPassword: ""
            }));
            setIsPasswordChange(false);
        } catch (error) {
            console.error("Error updating account:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update account");
        } finally {
            setIsLoading(false);
        }
    };

    // Function to get user email from the API
    const getUserEmailFromAPI = async () => {
        try {
            console.log('Attempting to fetch user data from API...');
            const response = await fetch('/api/auth/myaccount', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data from API:', data);
                return data.email;
            } else {
                const errorData = await response.json();
                console.error('API error:', errorData);
                toast.error(`API Error: ${errorData.message || 'Failed to fetch user data'}`);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user email:', error);
            toast.error(`Fetch Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return null;
        }
    };

    useEffect(() => {
        console.log('Auth status:', {
            nextAuthStatus: status,
            nextAuthSession: session ? 'exists' : 'null',
            customAuth: isAuthenticated,
            authLoading,
            user
        });

        // Set email from user data when available
        if (user?.email) {
            console.log('Using user email from useAuth:', user.email);
            setFormData(prev => ({
                ...prev,
                email: user.email,
                currentPassword: "", // Ensure current password is empty
                newPassword: "",
                verifyPassword: ""
            }));
            setOriginalEmail(user.email);
            setIsLoading(false);
        } else if (status === "authenticated" && session?.user?.email) {
            console.log('Using session email:', session.user.email);
            setFormData(prev => ({
                ...prev,
                email: session.user.email,
                currentPassword: "", // Ensure current password is empty
                newPassword: "",
                verifyPassword: ""
            }));
            setOriginalEmail(session.user.email);
            setIsLoading(false);
        } else if (status === "unauthenticated" && isAuthenticated) {
            console.log('Session not available, but custom auth is. Fetching from API...');
            // If NextAuth session is not available but custom auth is, try to get email from API
            getUserEmailFromAPI().then(email => {
                if (email) {
                    console.log('Email retrieved from API:', email);
                    setFormData(prev => ({
                        ...prev,
                        email: email,
                        currentPassword: "", // Ensure current password is empty
                        newPassword: "",
                        verifyPassword: ""
                    }));
                    setOriginalEmail(email);
                    setIsLoading(false);
                } else {
                    console.error('Failed to retrieve email from API');
                    setErrors({ error: "Unable to retrieve user information. Please try logging out and back in." });
                    setIsLoading(false);
                }
            });
        } else if (status === "unauthenticated" && !isAuthenticated && !authLoading) {
            console.log('Not authenticated');
            setErrors({ error: "You must be logged in to access this page" });
            setIsLoading(false);

            // Redirect to login page after a short delay
            const redirectTimer = setTimeout(() => {
                router.push('/login?from=/myaccount');
            }, 3000);

            return () => clearTimeout(redirectTimer);
        }
    }, [status, session, isAuthenticated, authLoading, router, user]);

    useEffect(() => {
        validateForm();
    }, [formData]);

    return (
        <div className="min-h-screen bg-[#080525] px-[50px] lg:px-[100px] pt-[60px] sm:pt-[120px]">
            {isLoading ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <div className="text-white text-xl">Loading user data...</div>
                </div>
            ) : (
                <>

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
                            required
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
                            required
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
                            required
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
                            required
                        />

                        <div className="flex flex-row gap-4 mt-4">
                            <button
                                onClick={handleUpdateAccount}
                                disabled={!hasChanges || !isValid}
                                className={`w-[120px] h-[40px] bg-[#00AEB9] text-white text-[14px] font-family-sora font-bold 
                                px-[25px] py-[7px] rounded-[32px] transition-opacity cursor-pointer ${
                                    !hasChanges || !isValid ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                                }`}
                            >
                                SAVE
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={ !hasChanges }
                                className={`w-[120px] h-[40px] bg-[#1C1840] text-white text-[14px] font-family-sora font-bold 
                                px-[25px] py-[7px] rounded-[32px] border border-[#00AEB9] transition-opacity cursor-pointer ${!hasChanges ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                                    }`}
                            >
                                CANCEL
                            </button>
                        </div>
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
                                disabled={is2FAEnabled}
                                className={`w-[109px] h-[35px] bg-[#3CDD22] text-white text-[14px] font-family-sora font-bold 
                                px-[25px] py-[7px] rounded-[32px] hover:opacity-90 transition-opacity cursor-pointer ${
                                    is2FAEnabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                ENABLE
                            </button>
                            <button
                                onClick={() => handle2FAToggle(false)}
                                disabled={!is2FAEnabled || is2FADisabled}
                                className={`w-[109px] h-[35px] bg-[#FF5252] text-white text-[14px] font-family-sora font-bold 
                                px-[25px] py-[7px] rounded-[32px] hover:opacity-90 transition-opacity cursor-pointer ${
                                    !is2FAEnabled || is2FADisabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                DISABLE
                            </button>
                        </div>
                    </div>

                    <TwoFactorSetupModal
                        isOpen={is2FASetupOpen}
                        onClose={() => setIs2FASetupOpen(false)}
                        onEnable={handle2FAEnable}
                        onActivate={handle2FAActivate}
                        email={formData.email}
                        qrCode={qrCode || ''}
                        backupCodes={backupCodes || []}
                        secret={secret || ''}
                    />

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
                </>
            )}
        </div>
    );
}