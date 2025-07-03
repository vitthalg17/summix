import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const plans = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        description: 'Perfect for getting started',
        items: [
            { text: '1 PDF summary per day', included: true },
            { text: 'Basic summary', included: true },
            { text: 'PDF download', included: true },
            { text: 'Community support', included: true },
            { text: 'Priority processing', included: false },
        ],
        paymentLink: '/sign-up',
        priceId: '',
    },
    {
        id: 'basic',
        name: 'Basic',
        price: 4.99,
        description: 'Perfect for individuals',
        items: [
            { text: '3 PDF summaries per day', included: true },
            { text: 'Standard processing', included: true },
            { text: 'Email support', included: true },
            { text: 'Basic Export', included: true }
        ],
        paymentLink: '',
        priceId: '',
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 9.99,
        description: 'For professionals and teams',
        items: [
            { text: 'Unlimited PDF summaries', included: true },
            { text: 'Priority processing', included: true },
            { text: '24/7 priority support', included: true },
            { text: 'Markdown Export', included: true }
        ],
        paymentLink: '',
        priceId: '',
    }
];

type PriceType = {
    name: string;
    price: number;
    description: string;
    items: Array<{ text: string; included: boolean } | string>;
    id: string;
    paymentLink: string;
    priceId: string;
};

const PricingCard = ({ name, price, description, items, id, paymentLink }: PriceType) => {
    return (
        <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
            <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-xl border-[1px] border-border rounded-2xl",
                id === 'pro' && 'border-primary gap-5 border-2'
            )}>
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <p className="text-lg lg:text-xl capitalize font-bold">{name}</p>
                        <p className="text-base-content/80 mt-2">{description}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {price === 0 ? (
                        <p className="text-5xl tracking-tight font-extrabold">Free</p>
                    ) : (
                        <>
                            <p className="text-5xl tracking-tight font-extrabold">${price}</p>
                            <div className="flex flex-col justify-end mb-[4px]">
                                <p className="text-xs uppercase font-semibold">USD</p>
                                <p className="text-xs">/month</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="space-y-2.5 leading-related text-base flex-1 ">
                    {items.map((item, idx) => {
                        const isItemObject = typeof item === 'object';
                        const text = isItemObject ? item.text : item;
                        const included = isItemObject ? item.included : true;
                        
                        return (
                            <li key={idx} className='flex items-center gap-2'>
                                {included ? (
                                    <CheckIcon size={18} className="text-green-500" />
                                ) : (
                                    <XIcon size={18} className="text-red-500" />
                                )}
                                <span className={cn(
                                    included ? '' : 'line-through text-gray-400'
                                )}>
                                    {text}
                                </span>
                            </li>
                        );
                    })}
                </div>
                
                <Link href={paymentLink} className={cn('w-full rounded-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 !text-white border-2 py-2',
                    id === 'pro' ? 'bg-primary hover:bg-primary/90' : 'bg-primary hover:bg-primary/90',
                    id === 'free' && 'bg-linear-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-600'
                )}>
                    {id === 'free' ? 'Get Started' : 'Buy Now'}
                </Link>
            </div>
        </div>
    );
};

const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: [
      { text: '1 PDF summary per day', included: true },
      { text: 'Basic summary', included: true },
      { text: 'PDF download', included: true },
      { text: 'Community support', included: true },
      { text: 'Priority processing', included: false },
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    period: "month",
    features: [
      { text: '3 PDF summaries per day', included: true },
      { text: 'Advanced summary', included: true },
      { text: 'PDF download', included: true },
      { text: 'Email support', included: true },
      { text: 'Priority processing', included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "₹999",
    period: "month",
    features: [
      { text: 'Unlimited PDF summaries', included: true },
      { text: 'Advanced summary', included: true },
      { text: 'PDF download', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true },
    ],
  },
];

export default function PricingSection() {
    return (
        <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Get started with our free plan or upgrade for more features
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <Card key={plan.name} className={`relative ${index === 1 ? 'border-primary shadow-lg scale-105' : ''}`}>
                            {index === 1 && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground px-4 py-1 text-sm rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription className="text-3xl font-bold text-foreground">
                                    {plan.price}
                                    <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <Check className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <X className="h-5 w-5 text-red-500" />
                                            )}
                                            <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-6" variant={index === 1 ? 'default' : 'outline'}>
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
