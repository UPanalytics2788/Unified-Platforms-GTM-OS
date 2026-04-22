import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Loader2, UserX, UserCheck } from 'lucide-react';
import { logAdminAction } from '../../lib/auditLogger';

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  suspended?: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(userList);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (uid: string, newRole: string) => {
    setSaving(uid);
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { role: newRole });
      await logAdminAction('update_user_role', { uid, newRole });
      setUsers(users.map(u => u.uid === uid ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setSaving(null);
    }
  };

  const handleSuspensionChange = async (uid: string, suspend: boolean) => {
    setSaving(uid);
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { suspended: suspend });
      await logAdminAction('update_user_suspension', { uid, suspended: suspend });
      setUsers(users.map(u => u.uid === uid ? { ...u, suspended: suspend } : u));
    } catch (error) {
      console.error('Error updating suspension status:', error);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-8">User Management</h1>
      <div className="bg-brand-white rounded-2xl border border-brand-dark/10 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-brand-dark/5 text-brand-dark text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-dark/10">
            {users.map((user) => (
              <tr key={user.uid} className={user.suspended ? 'bg-red-50/50' : ''}>
                <td className="px-6 py-4 text-brand-dark">{user.email}</td>
                <td className="px-6 py-4">
                  {user.suspended ? (
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">Suspended</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">Active</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                    disabled={user.suspended}
                    className="px-3 py-1 border border-brand-dark/10 rounded-lg bg-brand-white text-brand-dark disabled:opacity-50"
                  >
                    <option value="admin">Admin</option>
                    <option value="marketer">Marketer</option>
                    <option value="content">Content</option>
                    <option value="seo">SEO</option>
                    <option value="client">Client</option>
                  </select>
                </td>
                <td className="px-6 py-4 flex items-center gap-4">
                  {user.suspended ? (
                    <button
                      onClick={() => handleSuspensionChange(user.uid, false)}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-bold transition-colors"
                    >
                      <UserCheck size={16} /> Reactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSuspensionChange(user.uid, true)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-bold transition-colors"
                    >
                      <UserX size={16} /> Suspend
                    </button>
                  )}
                  {saving === user.uid && <Loader2 className="animate-spin text-brand-primary" size={20} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
