"use client";

import { Suspense } from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import io, { Socket } from "socket.io-client";

interface User {
  id: string;
  email: string;
  role: "au_pair" | "host_family" | "admin";
  name: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  type: "text" | "image" | "file";
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
  match: number;
}

function MessagesContent() {
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/auth/login");
      return;
    }

    // Initialize Socket.io connection
    const newSocket = io("https://au-pair.onrender.com", {
      auth: {
        token: JSON.parse(userData || "{}").token,
      },
    });

    setSocket(newSocket);

    // Mock conversations
    const mockConversations: Conversation[] = [
      {
        id: "1",
        name: "Maria Rodriguez",
        avatar:
          "https://images.pexels.com/photos/2714626/pexels-photo-2714626.jpeg",
        lastMessage: "I'd love to learn more about your family!",
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        unreadCount: 2,
        online: true,
        match: 95,
      },
      {
        id: "2",
        name: "The Johnson Family",
        avatar:
          "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
        lastMessage: "Thank you for your interest!",
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        unreadCount: 0,
        online: false,
        match: 88,
      },
      {
        id: "3",
        name: "Anna Mueller",
        avatar:
          "https://images.pexels.com/photos/15817434/pexels-photo-15817434.jpeg",
        lastMessage: "When are you available for a video call?",
        lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        unreadCount: 1,
        online: true,
        match: 92,
      },
    ];

    setConversations(mockConversations);

    // Check if there's a new conversation to start
    const newConversationId = searchParams.get("new");
    if (newConversationId) {
      setActiveConversation(newConversationId);
    } else if (mockConversations.length > 0) {
      setActiveConversation(mockConversations[0].id);
    }

    return () => {
      socket?.close();
    };
  }, [router, searchParams, socket]);

  useEffect(() => {
    if (activeConversation) {
      // Mock messages for active conversation
      const mockMessages: Message[] = [
        {
          id: "1",
          content:
            "Hi! I saw your profile and I think we might be a great match!",
          senderId: activeConversation === "1" ? "1" : "me",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          type: "text",
          status: "read",
        },
        {
          id: "2",
          content:
            "Thank you for reaching out! I would love to learn more about you and your family.",
          senderId: activeConversation === "1" ? "me" : "1",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          type: "text",
          status: "read",
        },
        {
          id: "3",
          content:
            "I'd love to learn more about your family! Could we schedule a video call this week?",
          senderId: activeConversation === "1" ? "1" : "me",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          type: "text",
          status: "delivered",
        },
      ];
      setMessages(mockMessages);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("typing", (data: { userId: string; isTyping: boolean }) => {
        setIsTyping(data.isTyping);
      });

      return () => {
        socket.off("message");
        socket.off("typing");
      };
    }
  }, [socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: "me",
      timestamp: new Date(),
      type: "text",
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Send via socket
    if (socket) {
      socket.emit("message", {
        conversationId: activeConversation,
        content: newMessage,
        type: "text",
      });
    }

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation
          ? { ...conv, lastMessage: newMessage, lastMessageTime: new Date() }
          : conv,
      ),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffHours = diff / (1000 * 60 * 60);
    const diffDays = diff / (1000 * 60 * 60 * 24);

    if (diffHours < 1) {
      return "Just now";
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else if (diffDays < 7) {
      return `${Math.floor(diffDays)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const activeConv = conversations.find((c) => c.id === activeConversation);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          style={{ height: "calc(100vh - 8rem)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="border-r border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Messages
                </h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div
                className="overflow-y-auto"
                style={{ height: "calc(100% - 140px)" }}
              >
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      activeConversation === conversation.id
                        ? "bg-primary-50 dark:bg-primary-950 border-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={conversation.avatar}
                          alt={conversation.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {conversation.name}
                          </p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">
                              {conversation.match}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                            {conversation.lastMessage}
                          </p>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col">
              {activeConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src={activeConv.avatar}
                            alt={activeConv.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {activeConv.online && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border border-white dark:border-gray-800 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h2 className="font-semibold text-gray-900 dark:text-white">
                            {activeConv.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {activeConv.online
                              ? "Online"
                              : `Last seen ${formatTime(
                                  activeConv.lastMessageTime,
                                )}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div
                    className="flex-1 overflow-y-auto p-6 space-y-4"
                    style={{ height: "calc(100% - 160px)" }}
                  >
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === "me"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === "me"
                              ? "bg-primary text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div
                            className={`flex items-center justify-between mt-1 ${
                              message.senderId === "me"
                                ? "text-primary-100"
                                : "text-gray-500"
                            }`}
                          >
                            <span className="text-xs">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {message.senderId === "me" && (
                              <span className="text-xs">
                                {message.status === "sent"
                                  ? "✓"
                                  : message.status === "delivered"
                                    ? "✓✓"
                                    : "✓✓"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="pr-12 rounded-full"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Start a Conversation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Select a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <MessagesContent />
    </Suspense>
  );
}