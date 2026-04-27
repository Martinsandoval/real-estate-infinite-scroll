"use client";

import React, { useState } from "react";
import {
  Card,
  DataList,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import styles from "./HouseCard.module.css";
import Dialog from "../Dialog/Dialog";
import { House } from "@/app/types/types";

export interface HouseCardProps {
  house: House;
}

/**
 * Compact property card showing a photo, address, homeowner and price.
 * Clicking the card opens a dialog with the full house details.
 */
const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
  const { address, price, photoURL, homeowner } = house;
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const formattedPrice = `$${price.toLocaleString()}`;

  return (
    <>
      <Card
        className={styles.card}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        aria-label={`View details for ${address}`}
      >
        <Flex direction="column" gap="3">
          <div className={styles.photoWrapper}>
            {imgError || !photoURL ? (
              <Flex
                className={styles.photoFallback}
                align="center"
                justify="center"
              >
                <HomeIcon className={styles.photoFallbackIcon} />
              </Flex>
            ) : (
              <img
                src={photoURL}
                alt={address}
                className={styles.photo}
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <Flex direction="column" gap="1" px="3" pb="3" pt="2">
            <Text size="4" weight="bold" className={styles.price}>
              {formattedPrice}
            </Text>
            <Heading size="3" className={styles.address}>
              {address}
            </Heading>
            <Flex align="center" gap="1">
              <PersonIcon className={styles.homeownerIcon} />
              <Text size="2" color="gray">
                {homeowner}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={address}
        content={
          <Flex direction="column" gap="4" width="100%">
            <div className={styles.dialogPhotoWrapper}>
              {imgError || !photoURL ? (
                <Flex
                  className={styles.dialogPhotoFallback}
                  align="center"
                  justify="center"
                >
                  <HomeIcon className={styles.dialogFallbackIcon} />
                </Flex>
              ) : (
                <img
                  src={photoURL}
                  alt={address}
                  className={styles.dialogPhoto}
                />
              )}
            </div>

            <Separator size="4" />

            <DataList.Root>
              <DataList.Item>
                <DataList.Label>Homeowner</DataList.Label>
                <DataList.Value>{homeowner}</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Price</DataList.Label>
                <DataList.Value>
                  <Text weight="bold" className={styles.price}>
                    {formattedPrice}
                  </Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Address</DataList.Label>
                <DataList.Value>{address}</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        }
      />
    </>
  );
};

export default HouseCard;
