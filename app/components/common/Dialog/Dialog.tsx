"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import clsx from "clsx";
import { Flex, IconButton, Theme } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./Dialog.css";

interface GenericDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string | React.ReactElement;
  description?: ReactNode;
  content?: ReactNode;
  actions?: ReactNode;
  variant?: DialogVariant;
}

enum DialogVariant {
  INFO = "info",
  DANGER = "danger",
}

/**
 * A flexible modal dialog component built on Radix UI.
 *
 * This component provides a customizable modal dialog with support for different visual variants,
 * controlled open/close state, and flexible content areas. It includes an overlay backdrop,
 * close button, and optional sections for title, description, content, and actions.
 *
 * @variant
 * - **info** (default): Blue accent, for general information or confirmations
 * - **danger**: Red accent, for destructive actions like delete or irreversible operations
 * - **warning**: Yellow/orange accent, for caution messages or important notices
 *
 * @author Martin Sandoval
 */
const Dialog: React.FC<React.PropsWithChildren<GenericDialogProps>> = ({
  open,
  onOpenChange,
  title,
  description,
  content,
  actions,
  variant = DialogVariant.INFO,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <Theme>
          <RadixDialog.Overlay className="DialogOverlay" />
          <RadixDialog.Content
            className={clsx("DialogBody", {
              "DialogBody--info": variant === "info",
              "DialogBody--danger": variant === "danger",
              "DialogBody--warning": variant === "warning",
            })}
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <Flex className="DialogHeading">
              <RadixDialog.Title className="DialogTitle">
                {title}
              </RadixDialog.Title>
              {description && (
                <Flex className="DialogDescription">{description}</Flex>
              )}
            </Flex>

            {content && <Flex className="DialogContent"> {content} </Flex>}

            {actions && <Flex className="DialogActions">{actions}</Flex>}

            <RadixDialog.Close asChild>
              <IconButton className="DialogClose" aria-label="Close">
                <Cross2Icon />
              </IconButton>
            </RadixDialog.Close>
          </RadixDialog.Content>
        </Theme>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
