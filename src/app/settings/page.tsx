"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SettingsItem } from "../../components/SettingsItem";
import { ChangeModal } from "../../components/ChangeModal";

export default function SettingsPage() {
  const userPlan = "free"; // or "basic" or "premium"

  const [adaptiveTiming, setAdaptiveTiming] = useState(true);
  const [weeklyEmail, setWeeklyEmail] = useState(true);
  const [learningSuggestions, setLearningSuggestions] = useState(true);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-teal-700">settings</h1>

      {/* Account */}
      <h2 className="text-sm font-medium text-gray-500 uppercase mb-2">Account</h2>
      <SettingsItem label="Change email" onClick={() => setShowEmailModal(true)} />
      <SettingsItem label="Change password" onClick={() => setShowPasswordModal(true)} />
      <SettingsItem label="Delete account" onClick={() => setShowDeleteModal(true)} />

      {/* Learning Preferences */}
      <h2 className="text-sm font-medium text-gray-500 uppercase mt-6 mb-2">Learning Preferences</h2>
      <SettingsItem
        label="Notification timing"
        rightElement={
          <span
            onClick={() => setAdaptiveTiming(!adaptiveTiming)}
            className="text-xs text-teal-600 cursor-pointer"
          >
            {adaptiveTiming ? "Adaptive ON" : "Adaptive OFF"}
          </span>
        }
      />
      <SettingsItem
        label="Weekly summary emails"
        rightElement={
          <Toggle checked={weeklyEmail} onChange={() => setWeeklyEmail(!weeklyEmail)} />
        }
      />
      <SettingsItem
        label="New Learning Suggestions"
        rightElement={
          <div className="flex items-center gap-2 group relative">
            <Toggle
              checked={learningSuggestions}
              onChange={() => setLearningSuggestions(!learningSuggestions)}
              disabled={userPlan === "free"}
            />
            {userPlan === "free" && (
              <>
                <span className="text-xs text-gray-400">🔒 Premium</span>
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-7 right-0 bg-white border border-gray-200 shadow-md rounded-md px-3 py-2 text-xs text-gray-700 w-52 z-10 opacity-0 group-hover:opacity-100 pointer-events-none"
                >
                  This feature is available on Basic or Premium plans.
                  <a href="/upgrade" className="text-teal-600 underline ml-1">Upgrade now</a>
                </motion.div>
              </>
            )}
          </div>
        }
      />
      <SettingsItem label="Preferred learning time" />

      {/* App Settings */}
      <h2 className="text-sm font-medium text-gray-500 uppercase mt-6 mb-2">App Settings</h2>
      <SettingsItem
        label="Contact support"
        rightElement={<span className="text-xs text-gray-400">Free plan</span>}
      />
      <SettingsItem
        label="FAQs"
        rightElement={<span className="text-xs text-gray-400">Manage Notifications</span>}
      />

      {/* Premium */}
      <h2 className="text-sm font-medium text-gray-500 uppercase mt-6 mb-2">Premium</h2>
      <SettingsItem
        label="Upgrade"
        rightElement={<span className="text-xs text-gray-400">Free plan</span>}
      />
      <SettingsItem label="Redeem code" />

      {/* Legal */}
      <h2 className="text-sm font-medium text-gray-500 uppercase mt-6 mb-2">Legal</h2>
      <SettingsItem label="Privacy Policy" href="/privacy" />
      <SettingsItem label="Terms and Conditions" href="/terms" />
      <SettingsItem label="Data export" />

      {/* Modals */}
      {showEmailModal && (
        <ChangeModal
          title="Change Email"
          fieldLabel="New email"
          onSubmit={(val) => console.log("New email:", val)}
          onClose={() => setShowEmailModal(false)}
        />
      )}
      {showPasswordModal && (
        <ChangeModal
          title="Change Password"
          fieldLabel="New password"
          onSubmit={(val) => console.log("New password:", val)}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
      {showDeleteModal && (
        <ChangeModal
          title="Delete Account"
          fieldLabel=""
          hideInput
          danger
          confirmText="Yes, delete my account"
          onSubmit={() => {
            console.log("Account deleted");
            setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        >
          <p className="text-sm text-red-600 mb-2">This action cannot be undone.</p>
          <p className="text-sm text-gray-700">All your data will be permanently removed.</p>
        </ChangeModal>
      )}
    </div>
  );
}

// ✅ Toggle Component
function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`inline-flex relative items-center cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={disabled ? undefined : onChange}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-teal-500 transition-all" />
      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-all" />
    </label>
  );
}
