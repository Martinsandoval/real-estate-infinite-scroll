"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import clsx from "clsx";
import { Flex, IconButton, Theme } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./Dialog.css";

interface GenericDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Callback fired when the open state changes (e.g. user closes via overlay or close button). */
  onOpenChange: (open: boolean) => void;
  /** Heading shown in the dialog header. Accepts a plain string or a custom element. */
  title: string | React.ReactElement;
  /** Optional subtext rendered below the title. */
  description?: ReactNode;
  /** Main body content of the dialog. */
  content?: ReactNode;
  /** Footer area, typically used for action buttons. */
  actions?: ReactNode;
  /** Visual style variant. Defaults to `DialogVariant.INFO`. */
  variant?: DialogVariant;
}

enum DialogVariant {
  INFO = "info",
  DANGER = "danger",
}

/**
 * A flexible modal dialog built on Radix UI.
 *
 * Provides controlled open/close state, an overlay backdrop, a close button,
 * and optional sections for description, body content, and footer actions.
 *
 * Variants:
 * - **info** (default): Blue accent, for general information or confirmations.
 * - **danger**: Red accent, for destructive or irreversible actions.
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
