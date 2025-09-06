"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ForumPost {
  _id: string;
  user: { name: string; email: string };
  content: string;
  createdAt: string;
}

export default function PeerForumPosts() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: check login status from localStorage (replace with real auth logic)
    setIsLoggedIn(!!localStorage.getItem('userToken'));
    axios.get('http://localhost:4000/api/forum')
      .then(res => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/forum', { content: input }, { withCredentials: true });
      setPosts(prev => [res.data, ...prev]);
      setInput('');
    } catch {
      // handle error
    }
    setLoading(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Share something..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>Post</button>
        </form>
      ) : (
        <div style={{ color: '#888', marginBottom: 16 }}>Please log in to create a post.</div>
      )}
      <div>
        {posts.map(post => (
          <div key={post._id} style={{ borderBottom: '1px solid #eee', margin: '8px 0' }}>
            <div><b>{post.user?.name || post.user?.email || 'Anonymous'}</b> <span style={{ color: '#888', fontSize: '0.8em' }}>{new Date(post.createdAt).toLocaleString()}</span></div>
            <div>{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
