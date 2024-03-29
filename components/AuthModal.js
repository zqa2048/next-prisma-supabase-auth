import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import { Dialog, Transition } from '@headlessui/react';
import { SparklesIcon, MailOpenIcon, XIcon } from '@heroicons/react/outline';
import Input from './Input';
import { signIn } from 'next-auth/react'


const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('This field is required'),
});

const Confirm = ({ show = false, email = "" }) => (
  <Transition appear show={show} as={Fragment}>
    <div className="fixed inset-0 z-50">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-white" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="flex items-center justify-center h-full p-8">
          <div className="overflow-hidden transition-all transform">
            <h3 className="text-center text-lg font-medium leading-6">
              <div className="flex flex-col justify-center items-center space-y-4">
                <MailOpenIcon className="w-12 h-12 shrink-0 text-rose-500" />
              </div>
              <p className="text-2xl font-semibold mt-2">确认邮件</p>
            </h3>

            <p className="text-lg text-center mt-4">
              我们用电子邮件向 <strong>{email ?? ""}</strong>
              发送了一个登录的链接.
              <br />
              检查你的收件箱，点击电子邮件中的链接登录或注册.
            </p>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Transition>
);

const AuthModal = ({ show = false, onClose = () => null }) => {
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const signInWithEmail = async ({ email }) => {
    // TODO: Perform email auth
    let toastId;

    try {
      toastId = toast.loading("loading...");
      setDisabled(true);
      const { error } = await signIn("email", {
        redirect: false,
        callbackUrl: window.location.href,
        email,
      });
      if (error) {
        throw new Error(error);
      }
      setConfirm(true);
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("无法登录", { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

  const signInWithGoogle = () => {
    // TODO: Perform Google auth
    toast.loading("跳转中");
    setDisabled(true);
    signIn("google", {
      callbackUrl: window.location.href,
    });
  };

  const closeModal = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Reset modal
  useEffect(() => {
    if (!show) {
      // Wait for 200ms for aniamtion to finish
      setTimeout(() => {
        setDisabled(false);
        setConfirm(false);
        setShowSignIn(false);
      }, 200);
    }
  }, [show]);

  // Remove pending toasts if any
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:rounded-md max-w-md relative">
              {/* Close icon */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 shrink-0 p-1 rounded-md hover:bg-gray-100 transition focus:outline-none"
              >
                <XIcon className="w-5 h-5" />
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <div className="flex justify-center">
                    <Link href="/">
                      <a className="flex items-center space-x-1">
                        <SparklesIcon className="shrink-0 w-8 h-8 text-rose-500" />
                        <span className="text-xl font-semibold tracking-wide">
                          民<span className="text-rose-500">宿</span>
                        </span>
                      </a>
                    </Link>
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="mt-6 font-bold text-lg sm:text-2xl text-center"
                  >
                    {showSignIn ? "欢迎回来!" : "创建您的帐户"}
                  </Dialog.Title>

                  {!showSignIn ? (
                    <Dialog.Description className="mt-2 text-gray-500 text-base text-center">
                      请创建一个帐户来列出您的房子和你喜欢的收藏。
                    </Dialog.Description>
                  ) : null}

                  <div className="mt-10">
                    {/* Sign with Google */}
                    <button
                      disabled={disabled}
                      onClick={() => signInWithGoogle()}
                      className="h-[46px] w-full mx-auto border rounded-md p-2 flex justify-center items-center space-x-2 text-gray-500 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-200 transition-colors"
                    >
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={32}
                        height={32}
                      />
                      <span>登录 谷歌账号</span>
                    </button>

                    {/* Sign with email */}
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={SignInSchema}
                      validateOnBlur={false}
                      onSubmit={signInWithEmail}
                    >
                      {({ isSubmitting, isValid, values, resetForm }) => (
                        <Form className="mt-4">
                          <Input
                            name="email"
                            type="email"
                            placeholder="your@spacex.com"
                            disabled={disabled}
                            spellCheck={false}
                          />

                          <button
                            type="submit"
                            disabled={disabled || !isValid}
                            className="mt-6 w-full bg-rose-600 text-white py-2 px-8 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600"
                          >
                            {isSubmitting ? "Loading..." : `登录`}
                          </button>

                          <p className="mt-2 text-center text-sm text-gray-500">
                            {showSignIn ? (
                              <>
                                还没有账户?{" "}
                                <button
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    setShowSignIn(false);
                                    resetForm();
                                  }}
                                  className="underline underline-offset-1 font-semibold text-rose-500 hover:text-rose-600 disabled:hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  注册
                                </button>
                                .
                              </>
                            ) : (
                              <>
                                已有帐户?{" "}
                                <button
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    setShowSignIn(true);
                                    resetForm();
                                  }}
                                  className="underline underline-offset-1 font-semibold text-rose-500 hover:text-rose-600 disabled:hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  登录
                                </button>
                                .
                              </>
                            )}
                          </p>

                          <Confirm
                            show={showConfirm}
                            email={values?.email ?? ""}
                          />
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

AuthModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AuthModal;
