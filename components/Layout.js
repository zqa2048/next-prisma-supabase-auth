import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import PropTypes from "prop-types";
import AuthModal from "./AuthModal";
import { Menu, Transition } from "@headlessui/react";
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";

const menuItems = [
  {
    label: "添加房屋",
    icon: PlusIcon,
    href: "/create",
  },
  {
    label: "我的房屋",
    icon: HomeIcon,
    href: "/homes",
  },
  {
    label: "收藏夹",
    icon: HeartIcon,
    href: "/favorites",
  },
  {
    label: "退出登录",
    icon: LogoutIcon,
    onClick: () => signOut(),
  },
];

const Layout = ({ children = null }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === "loading";

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title> ✨ 民宿 </title>
        <meta
          name="title"
          content="Learn how to Build a Fullstack App with Next.js, PlanetScale & Prisma | The Modern Dev"
        />
        <link rel="icon" href="/hotel.png" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="h-16 w-full shadow-md">
          <div className="h-full container mx-auto">
            <div className="h-full px-4 flex justify-between items-center space-x-4">
              <Link href="/">
                <a className="flex items-center space-x-1">
                  <SparklesIcon className="shrink-0 w-8 h-8 text-rose-500" />
                  <span className="text-xl font-semibold tracking-wide">
                    民<span className="text-rose-600">宿</span>
                  </span>
                </a>
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    session?.user ? router.push("/create") : openModal();
                  }}
                >
                  <a className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md">
                    添加房屋
                  </a>
                </button>
                {isLoadingUser ? (
                  <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (
                  <Menu as="div" className="relative z-50">
                    <Menu.Button className="flex items-center space-x-px group">
                      <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                        <Image
                          src={
                            user?.image ??
                            `https://api.dicebear.com/5.x/open-peeps/svg?seed=${user?.email}`
                          }
                          alt={user?.name || "Avatar"}
                          layout="fill"
                        />
                      </div>
                      <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                          <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                            <Image
                              src={
                                user?.image ??
                                `https://api.dicebear.com/5.x/open-peeps/svg?seed=${user?.email}`
                              }
                              alt={user?.name || "Avatar"}
                              layout="fill"
                            />
                          </div>
                          <div className="flex flex-col truncate">
                            <span>{user?.name}</span>
                            <span className="text-sm text-gray-500">
                              {user?.email}
                            </span>
                          </div>
                        </div>

                        <div className="py-2">
                          {menuItems.map(
                            ({ label, href, onClick, icon: Icon }) => (
                              <div
                                key={label}
                                className="px-2 last:border-t last:pt-2 last:mt-2"
                              >
                                <Menu.Item>
                                  {href ? (
                                    <Link href={href}>
                                      <a className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100">
                                        <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                        <span>{label}</span>
                                      </a>
                                    </Link>
                                  ) : (
                                    <button
                                      className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                      onClick={onClick}
                                    >
                                      <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                      <span>{label}</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            )
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    type="button"
                    onClick={openModal}
                    className="ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition"
                  >
                    登录
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto">
          <div className="px-4 py-12">
            {typeof children === "function" ? children(openModal) : children}
          </div>
        </main>
        <footer className="mt-8 container mx-auto">
          <div className="px-4 py-6">
            <p className="text-sm text-center cursor-pointer">
              <a
                href="https://github.com/zqa2048/next-prisma-supabase-auth"
                target="_blank"
                rel="noreferrer"
              >
                乾坤团队
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="inline-block w-4 h-4 -mt-1 text-red-600 animate-pulse"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
                </svg>
                提供技术驱动 - 2023
              </a>
            </p>
          </div>
        </footer>
        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;
